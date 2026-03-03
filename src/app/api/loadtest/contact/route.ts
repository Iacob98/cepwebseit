import { NextRequest, NextResponse } from "next/server";
import { appendContactSubmission } from "@/lib/dal";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const secret = req.headers.get("x-loadtest-secret");
  if (secret !== process.env.LOADTEST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const submission = {
      id: crypto.randomUUID(),
      anrede: body.anrede ?? "Herr",
      vorname: body.vorname ?? "Test",
      nachname: body.nachname ?? "User",
      email: body.email ?? "test@example.com",
      telefon: body.telefon ?? "",
      nachricht: body.nachricht ?? "Load test submission",
      createdAt: new Date().toISOString(),
      read: false,
    };

    await appendContactSubmission(submission);
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
