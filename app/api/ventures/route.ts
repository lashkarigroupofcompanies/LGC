import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const BLOB_FILENAME = "lgc-ecosystem-data.json";

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ ventures: null, stats: null });
    }

    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const existingBlob = blobs.find(
      (b) => b.pathname === BLOB_FILENAME || b.url.includes(BLOB_FILENAME)
    );

    if (!existingBlob) {
      return NextResponse.json({ ventures: null, stats: null });
    }

    const response = await fetch(existingBlob.url, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ ventures: null, stats: null });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error reading from Vercel Blob:", err);
    return NextResponse.json({ ventures: null, stats: null });
  }
}

export async function POST(req: Request) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const body = await req.json();
    const { ventures, stats } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Blob token not configured in this environment" },
        { status: 500 }
      );
    }

    const blob = await put(BLOB_FILENAME, JSON.stringify({ ventures, stats }), {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    console.error("Error saving to Vercel Blob:", err);
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
