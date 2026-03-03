import { NextRequest, NextResponse } from "next/server";
import { appendPartnerSubmission } from "@/lib/dal";

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
      firmenname: body.firmenname ?? "Test GmbH",
      ansprechpartner: body.ansprechpartner ?? "Max Mustermann",
      email: body.email ?? "partner@example.com",
      telefon: body.telefon ?? "",
      website: body.website ?? "",
      branche: body.branche ?? "Handwerk",
      region: body.region ?? "Südbaden",
      nachricht: body.nachricht ?? "Load test partner submission",
      createdAt: new Date().toISOString(),
      read: false,
    };

    await appendPartnerSubmission(submission);
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
