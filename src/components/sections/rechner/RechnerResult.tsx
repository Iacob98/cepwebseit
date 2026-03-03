import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function RechnerResult() {
  return (
    <section className="py-20">
      <Container className="max-w-2xl">
        <div className="rounded-xl border border-border bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
            <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Vielen Dank für Ihre Anfrage!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wir haben Ihre Daten erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
          </p>
          <div className="mt-8 rounded-lg bg-muted/30 p-6">
            <h3 className="font-semibold text-foreground">So geht es weiter:</h3>
            <ol className="mt-3 space-y-2 text-left text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold flex-shrink-0">1</span>
                Wir prüfen Ihre Angaben und erstellen eine erste Einschätzung.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold flex-shrink-0">2</span>
                Ein Experte kontaktiert Sie für eine persönliche Beratung.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold flex-shrink-0">3</span>
                Sie erhalten ein individuelles Angebot inkl. Fördermittelberechnung.
              </li>
            </ol>
          </div>
          <div className="mt-8">
            <Button href="/">Zurück zur Startseite</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
