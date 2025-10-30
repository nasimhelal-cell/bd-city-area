import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url } = body;

  let fullUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    fullUrl = `https://${url}`;
  }

  try {
    await fetch(fullUrl, {
      method: "HEAD",
      mode: "no-cors",
    });

    return NextResponse.json({ reachable: true });
  } catch {
    return NextResponse.json({ reachable: false });
  }
}
