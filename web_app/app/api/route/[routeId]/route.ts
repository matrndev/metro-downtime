import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8000";

export async function GET(
  _req: Request,
  context: { params: Promise<{ routeId: string }> }
) {
  const { routeId } = await context.params;

  try {
    const upstreamResponse = await fetch(`${BACKEND_URL}/info/route/${routeId}`, {
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: "Couldn't connect to backend API" },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Couldn't connect to backend API" },
      { status: 502 }
    );
  }
}