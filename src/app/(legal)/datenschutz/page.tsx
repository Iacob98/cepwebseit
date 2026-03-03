import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getCompany } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der CEP Clever Energie Power GmbH gemäß DSGVO.",
};

export default async function DatenschutzPage() {
  const company = await getCompany();

  return (
    <Container className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Datenschutzerklärung</h1>
      <div className="mt-8 prose prose-gray max-w-none">
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
          passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
        </p>
        <p>
          {company.fullName}<br />
          {company.address.street}<br />
          {company.address.zip} {company.address.city}<br />
          E-Mail: {company.email}<br />
          Telefon: {company.phoneDisplay}
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten,
          die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es
          sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
          Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
        </p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
          dieser Datenschutzerklärung.
        </p>

        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
          {company.fullName}<br />
          {company.address.street}<br />
          {company.address.zip} {company.address.city}
        </p>

        <h2>4. Datenerfassung auf dieser Website</h2>
        <h3>Cookies</h3>
        <p>
          Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf
          Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
          (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
        </p>
        <p>
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
          Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
          ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
        </p>

        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
          Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
          und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
          Einwilligung weiter.
        </p>
        <p>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
          Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
          erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse
          an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
          Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
        </p>

        <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
        <p>
          Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus
          hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens
          bei uns gespeichert und verarbeitet.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht:</p>
        <ul>
          <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
          <li>Die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
          <li>Die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
          <li>Die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
          <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
          <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
        </ul>
        <p>
          Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, haben Sie
          das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
        </p>

        <h2>6. Aktualität und Änderung dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die
          Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher
          beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
        </p>
      </div>
    </Container>
  );
}
