import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const steps = [
  { step: "1", title: "Fördermittelcheck", desc: "Wir prüfen Ihre maximale Fördersumme." },
  { step: "2", title: "Antragstellung", desc: "Wir übernehmen den kompletten Antrag." },
  { step: "3", title: "Auszahlung", desc: "Sie erhalten Ihre Förderung ausgezahlt." },
];

export function FoerderungServiceCallout() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-muted/30 border border-border px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Wir übernehmen die Förderanträge für Sie
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Bis zu 70&nbsp;%* Zuschuss — wir kümmern uns um die komplette
            Antragstellung bei BAFA und KfW, damit Sie die maximale Förderung
            erhalten.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 border border-border"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {s.step}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/foerderung">Mehr zur Förderung</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
