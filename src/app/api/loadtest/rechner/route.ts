import { NextRequest, NextResponse } from "next/server";
import { appendRechnerSubmission } from "@/lib/dal";

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
      gebaeudetyp: body.gebaeudetyp ?? "einfamilienhaus",
      eigentuemer: body.eigentuemer ?? "eigentuemer",
      baujahr: body.baujahr ?? "2000-2010",
      wohnflaeche: body.wohnflaeche ?? "100-150",
      daemmung: body.daemmung ?? "gut",
      fenster: body.fenster ?? "doppelverglasung",
      aktuelleHeizung: body.aktuelleHeizung ?? "gas",
      heizungsalter: body.heizungsalter ?? "10-15",
      warmwasser: body.warmwasser ?? "heizung",
      waermepumpentyp: body.waermepumpentyp ?? "luft-wasser",
      photovoltaik: body.photovoltaik ?? "ja-vorhanden",
      zeitrahmen: body.zeitrahmen ?? "3-6-monate",
      anrede: body.anrede ?? "Herr",
      vorname: body.vorname ?? "Test",
      nachname: body.nachname ?? "User",
      email: body.email ?? "test@example.com",
      telefon: body.telefon ?? "+49 123 456789",
      strasse: body.strasse ?? "Teststr. 1",
      plz: body.plz ?? "79541",
      ort: body.ort ?? "Lörrach",
      nachricht: body.nachricht ?? "",
      createdAt: new Date().toISOString(),
      read: false,
    };

    await appendRechnerSubmission(submission);
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
