import { NextResponse } from "next/server";
import { get, put, list } from "@vercel/blob";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BLOB_FILENAME = "lgc-ecosystem-data.json";

function resolveBlobCredentials(): { token?: string; storeId?: string } {
  // 1. Resolve Blob Store ID
  let storeId = process.env.BLOB_STORE_ID;
  if (!storeId) {
    const storeKey = Object.keys(process.env).find(
      (k) => k.endsWith("STORE_ID") || k.includes("STORE_ID") || k.includes("STORAGE_ID")
    );
    if (storeKey && process.env[storeKey]) {
      storeId = process.env[storeKey];
      process.env.BLOB_STORE_ID = storeId;
    }
  }

  // 2. Resolve Read-Write Token
  let token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    const tokenKey = Object.keys(process.env).find(
      (k) => k.includes("READ_WRITE_TOKEN") || (k.includes("BLOB") && k.includes("TOKEN"))
    );
    if (tokenKey && process.env[tokenKey]) {
      token = process.env[tokenKey];
      process.env.BLOB_READ_WRITE_TOKEN = token;
    }
  }

  return { token: token || undefined, storeId: storeId || undefined };
}

export async function GET() {
  try {
    const { token, storeId } = resolveBlobCredentials();
    const commandOptions: Record<string, unknown> = {
      useCache: false,
    };
    if (token) commandOptions.token = token;
    if (storeId) commandOptions.storeId = storeId;

    // 1. Try reading private blob directly (lgc-storage Private Blob Store)
    try {
      const resPrivate = await get(BLOB_FILENAME, {
        ...commandOptions,
        access: "private",
      });
      if (resPrivate && resPrivate.stream) {
        const text = await new Response(resPrivate.stream).text();
        const data = JSON.parse(text);
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "CDN-Cache-Control": "no-store",
            "Vercel-CDN-Cache-Control": "no-store",
          },
        });
      }
    } catch {
      // 2. Try reading public blob directly as fallback
      try {
        const resPublic = await get(BLOB_FILENAME, {
          ...commandOptions,
          access: "public",
        });
        if (resPublic && resPublic.stream) {
          const text = await new Response(resPublic.stream).text();
          const data = JSON.parse(text);
          return NextResponse.json(data, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              "CDN-Cache-Control": "no-store",
              "Vercel-CDN-Cache-Control": "no-store",
            },
          });
        }
      } catch {}
    }

    // 3. Fallback: list blobs to locate BLOB_FILENAME
    try {
      const listOptions: Record<string, unknown> = { prefix: BLOB_FILENAME };
      if (token) listOptions.token = token;
      if (storeId) listOptions.storeId = storeId;

      const { blobs } = await list(listOptions);
      const existingBlob = blobs.find(
        (b) => b.pathname === BLOB_FILENAME || b.url.includes(BLOB_FILENAME)
      );

      if (existingBlob) {
        // Try get() using the specific blob url
        try {
          const res = await get(existingBlob.url, {
            ...commandOptions,
            access: "private",
          });
          if (res && res.stream) {
            const text = await new Response(res.stream).text();
            const data = JSON.parse(text);
            return NextResponse.json(data, {
              headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "CDN-Cache-Control": "no-store",
                "Vercel-CDN-Cache-Control": "no-store",
              },
            });
          }
        } catch {}

        // Direct fetch with Authorization header if token exists
        const downloadUrl = existingBlob.downloadUrl || existingBlob.url;
        const fetchHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(downloadUrl, {
          headers: fetchHeaders,
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              "CDN-Cache-Control": "no-store",
              "Vercel-CDN-Cache-Control": "no-store",
            },
          });
        }
      }
    } catch (listErr) {
      console.warn("Vercel Blob list query encountered error:", listErr);
    }

    return NextResponse.json({ ventures: null, stats: null });
  } catch (err) {
    console.error("Error reading from Vercel Blob:", err);
    return NextResponse.json({ ventures: null, stats: null });
  }
}

export async function POST(req: Request) {
  try {
    const { token, storeId } = resolveBlobCredentials();
    const body = await req.json();
    const { ventures, stats, password } = body;

    // Strict Master Security Gate: Require exact key LGC@2026
    if (password !== "LGC@2026") {
      return NextResponse.json(
        { error: "Unauthorized: Invalid master authorization key. Required: LGC@2026" },
        { status: 401 }
      );
    }

    const payload = JSON.stringify({
      ventures,
      stats,
      updatedAt: new Date().toISOString(),
    });

    const putOptions: Record<string, unknown> = {
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    };
    if (token) putOptions.token = token;
    if (storeId) putOptions.storeId = storeId;

    let blob;
    // 1. Try private put first (matches user's Private Blob Store 'lgc-storage')
    try {
      blob = await put(BLOB_FILENAME, payload, {
        ...putOptions,
        access: "private",
      });
    } catch (privErr) {
      console.warn("Private blob put failed, trying public put:", privErr);
      // 2. Fallback to public put if store is configured as public
      blob = await put(BLOB_FILENAME, payload, {
        ...putOptions,
        access: "public",
      });
    }

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      updatedAt: new Date().toISOString(),
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Error saving to Vercel Blob:", err);
    const message = err instanceof Error ? err.message : "Failed to save to cloud storage";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
