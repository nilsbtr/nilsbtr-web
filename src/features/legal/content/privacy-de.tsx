import {
  Analytics01Icon,
  ArrowDataTransferHorizontalIcon,
  Cancel01Icon,
  Delete02Icon,
  Edit02Icon,
  FileExportIcon,
  JudgeIcon,
  LockKeyIcon,
  MessageQuestionIcon,
  Shield01Icon,
  StopCircleIcon,
  UserShield01Icon,
} from "@hugeicons/core-free-icons";

import type { Operator } from "@/config/legal";

import {
  Callout,
  CardGrid,
  InfoCard,
  List,
  P,
  ProseLink,
  Ref,
  StorageTable,
} from "../components/blocks";
import { ConsentStatus } from "../components/consent-status";
import { OperatorCard } from "../components/operator-card";
import type { LegalSection } from "../types";
import { ANALYTICS_SECTION_ID, PROCESSORS, SUPERVISORY_AUTHORITIES_URL } from "./shared";

/** The privacy policy in German. This version is the binding one. */
export function getPrivacySectionsDe(operator: Operator): LegalSection[] {
  return [
    {
      id: "ueberblick",
      title: "Auf einen Blick",
      content: (
        <>
          <P>
            Diese Website ist meine persönliche Seite. Ich erhebe so wenige Daten wie möglich und
            erkläre hier, welche es sind, wozu ich sie brauche und welche Rechte Sie haben.
          </P>
          <CardGrid>
            <InfoCard icon={Shield01Icon} title="Kein Tracking, keine Werbung">
              Keine Werbe- oder Tracking-Cookies, kein Verkauf und keine Weitergabe Ihrer Daten zu
              Werbezwecken.
            </InfoCard>
            <InfoCard icon={Analytics01Icon} title="Statistik nur mit Einwilligung">
              Die cookielose Reichweitenmessung von Vercel läuft erst, wenn Sie zustimmen, und lässt
              sich jederzeit wieder abschalten.
            </InfoCard>
            <InfoCard icon={UserShield01Icon} title="Konten nur auf Einladung">
              Für ein Konto speichere ich nur, was für Anmeldung und Betrieb nötig ist.
            </InfoCard>
            <InfoCard icon={FileExportIcon} title="Ihre Daten, Ihre Kontrolle">
              Im Profil laden Sie alle Kontodaten herunter oder löschen Ihr Konto mit wenigen
              Klicks.
            </InfoCard>
          </CardGrid>
        </>
      ),
    },
    {
      id: "verantwortlicher",
      title: "Verantwortlicher",
      content: (
        <>
          <P>
            Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne
            der Datenschutz-Grundverordnung (DSGVO) ist:
          </P>
          <OperatorCard operator={operator} lang="de" />
          <P>
            Bei Fragen zum Datenschutz oder um Ihre Rechte auszuüben, genügt eine formlose Nachricht
            an diese Kontaktdaten. Einen Datenschutzbeauftragten habe ich nicht benannt, da dafür
            keine gesetzliche Pflicht besteht.
          </P>
        </>
      ),
    },
    {
      id: "hosting",
      title: "Hosting und Server-Logfiles",
      content: (
        <>
          <P>
            Diese Website wird bei {PROCESSORS.vercel.name}, {PROCESSORS.vercel.address}, gehostet.
            Bei jedem Seitenaufruf überträgt Ihr Browser technisch bedingt Daten, die Vercel in
            Server-Logfiles verarbeitet:
          </P>
          <List
            items={[
              "IP-Adresse des anfragenden Geräts",
              "Datum und Uhrzeit des Zugriffs",
              "aufgerufene Adresse (URL) und HTTP-Statuscode",
              "zuvor besuchte Seite (Referrer), sofern Ihr Browser sie übermittelt",
              "Browser und Betriebssystem (User-Agent)",
              "übertragene Datenmenge",
            ]}
          />
          <P>
            Diese Verarbeitung ist erforderlich, um die Website auszuliefern sowie ihre Sicherheit
            und Stabilität zu gewährleisten, etwa um Angriffe zu erkennen und abzuwehren.
            Rechtsgrundlage ist <Ref>Art. 6 Abs. 1 lit. f DSGVO</Ref>; mein berechtigtes Interesse
            liegt im sicheren und zuverlässigen Betrieb der Website. Die Logfiles werden nur
            kurzzeitig gespeichert und anschließend automatisch gelöscht. Eine Zusammenführung mit
            anderen Datenquellen findet nicht statt.
          </P>
          <P>
            Vercel verarbeitet die Daten als Auftragsverarbeiter ausschließlich nach meinen
            Weisungen auf Grundlage eines Vertrags zur Auftragsverarbeitung nach{" "}
            <Ref>Art. 28 DSGVO</Ref>. Mehr dazu in der{" "}
            <ProseLink href={PROCESSORS.vercel.privacyUrl}>
              Datenschutzerklärung von Vercel
            </ProseLink>
            .
          </P>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies und lokale Speicherung",
      content: (
        <>
          <P>
            Diese Website setzt keine Cookies zu Werbe-, Analyse- oder Trackingzwecken. Im Browser
            gespeichert wird nur, was für eine von Ihnen gewünschte Funktion unbedingt erforderlich
            ist:
          </P>
          <StorageTable
            labels={{ purpose: "Zweck", duration: "Speicherdauer" }}
            entries={[
              {
                name: "better-auth.session_token",
                kind: "Cookie",
                purpose:
                  "Hält Sie nach der Anmeldung angemeldet und wird nur gesetzt, wenn Sie sich anmelden. Bei verschlüsselter Verbindung trägt der Name das Präfix __Secure-.",
                duration: "bis zur Abmeldung, höchstens 7 Tage ohne Nutzung",
              },
              {
                name: "invite_token",
                kind: "Cookie",
                purpose:
                  "Merkt sich eine eingelöste Einladung, bis die Registrierung abgeschlossen ist.",
                duration: "10 Minuten",
              },
              {
                name: "theme",
                kind: "Local Storage",
                purpose: "Speichert das von Ihnen gewählte helle oder dunkle Farbschema.",
                duration: "bis Sie es im Browser löschen",
              },
              {
                name: "analytics-consent",
                kind: "Local Storage",
                purpose:
                  "Speichert Ihre Entscheidung zur Reichweitenmessung, damit ich nicht bei jedem Besuch erneut frage.",
                duration: "12 Monate, danach frage ich erneut",
              },
            ]}
          />
          <P>
            Rechtsgrundlage für das Speichern und Auslesen dieser Informationen ist{" "}
            <Ref>§ 25 Abs. 2 Nr. 2 TDDDG</Ref>, da sie für den von Ihnen gewünschten Dienst
            unbedingt erforderlich sind. Die weitere Verarbeitung stützt sich auf{" "}
            <Ref>Art. 6 Abs. 1 lit. b DSGVO</Ref> (Anmeldung) und{" "}
            <Ref>Art. 6 Abs. 1 lit. f DSGVO</Ref> (Darstellung nach Ihren Wünschen, Nachweis Ihrer
            Entscheidung). Sie können Cookies und lokal gespeicherte Daten jederzeit in Ihrem
            Browser löschen.
          </P>
        </>
      ),
    },
    {
      id: ANALYTICS_SECTION_ID,
      title: "Reichweitenmessung mit Vercel",
      content: (
        <>
          <P>
            Wenn Sie einwilligen, nutze ich <strong>Vercel Web Analytics</strong> und{" "}
            <strong>Vercel Speed Insights</strong>, ebenfalls von Vercel. So sehe ich, welche Seiten
            wie oft besucht werden und wie schnell sie laden. Verarbeitet werden dabei:
          </P>
          <List
            items={[
              "aufgerufene Seite und Referrer",
              "Browser, Betriebssystem und Gerätetyp",
              "das aus der IP-Adresse abgeleitete Land",
              "Messwerte zur Ladezeit (Web Vitals)",
            ]}
          />
          <P>
            Es werden keine Cookies gesetzt und keine IP-Adressen gespeichert. Um Besuche zählen zu
            können, bildet Vercel aus Merkmalen der Anfrage einen Hash-Wert, der nach 24 Stunden
            verworfen wird. Ein Wiedererkennen über andere Websites hinweg oder das Bilden von
            Nutzerprofilen findet nicht statt; ich sehe nur zusammengefasste Statistiken.
          </P>
          <P>
            Rechtsgrundlage ist Ihre Einwilligung nach <Ref>§ 25 Abs. 1 TDDDG</Ref> und{" "}
            <Ref>Art. 6 Abs. 1 lit. a DSGVO</Ref>. Ohne Einwilligung werden die Skripte gar nicht
            erst geladen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft
            widerrufen, hier oder über »Privacy settings« am Ende jeder Seite. Die Rechtmäßigkeit
            der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
          </P>
          <ConsentStatus lang="de" />
        </>
      ),
    },
    {
      id: "konto",
      title: "Benutzerkonto",
      content: (
        <>
          <P>
            Konten werden nur auf Einladung vergeben. Wenn Sie sich registrieren und Ihr Konto
            nutzen, verarbeite ich:
          </P>
          <List
            items={[
              <>
                <strong>Profildaten:</strong> Benutzername, Name und E-Mail-Adresse
              </>,
              <>
                <strong>Zugangsdaten:</strong> Ihr Passwort, gespeichert ausschließlich als
                kryptografischer Hash, aus dem es sich nicht zurückrechnen lässt
              </>,
              <>
                <strong>Kontoverwaltung:</strong> Rolle, Zeitpunkte von Erstellung und Änderung,
                gegebenenfalls eine Sperre mit Grund und Dauer
              </>,
              <>
                <strong>Sitzungsdaten:</strong> je Anmeldung IP-Adresse, Browser-Kennung
                (User-Agent) sowie Beginn und Ablauf der Sitzung
              </>,
            ]}
          />
          <P>
            Ihr Avatar wird in Ihrem Browser aus dem Benutzernamen gezeichnet. Er wird weder
            gespeichert noch von einem externen Dienst geladen.
          </P>
          <P>
            Die Daten dienen dazu, Ihr Konto bereitzustellen und Sie anzumelden. Rechtsgrundlage ist{" "}
            <Ref>Art. 6 Abs. 1 lit. b DSGVO</Ref>. Sitzungsdaten und Sperren verarbeite ich außerdem
            auf Grundlage von <Ref>Art. 6 Abs. 1 lit. f DSGVO</Ref>, um unbefugte Zugriffe und
            Missbrauch zu erkennen und zu verhindern. Administratoren dieser Website können
            Kontodaten einsehen und Konten verwalten.
          </P>
          <P>
            Ihre Kontodaten speichere ich, bis Sie Ihr Konto löschen. Sitzungen laufen nach sieben
            Tagen ohne Nutzung ab und werden danach automatisch gelöscht.
          </P>
          <Callout icon={UserShield01Icon} title="Selbst verwalten">
            <P>
              In Ihrem <ProseLink href="/profile">Profil</ProseLink> können Sie Ihre Angaben ändern,
              eine vollständige Kopie Ihrer Daten als JSON-Datei herunterladen und Ihr Konto
              endgültig löschen. Sitzungen und Zugangsdaten werden dabei sofort mit entfernt.
            </P>
          </Callout>
        </>
      ),
    },
    {
      id: "einladungen",
      title: "Einladungen",
      content: (
        <P>
          Erstellt ein Administrator eine Einladung, speichere ich einen zufälligen Code,
          Ablaufdatum, Anzahl möglicher Nutzungen und das erstellende Konto. Wird die Einladung
          eingelöst, halte ich fest, wann und von welchem Konto. So bleibt nachvollziehbar, wie
          jemand Zugang erhalten hat. Rechtsgrundlage ist <Ref>Art. 6 Abs. 1 lit. f DSGVO</Ref>;
          mein berechtigtes Interesse liegt in einem geschlossenen, vor Missbrauch geschützten
          Nutzerkreis. Aufgebrauchte und widerrufene Einladungen werden automatisch gelöscht; die
          Zuordnung zu Ihrem Konto entfällt spätestens mit dessen Löschung.
        </P>
      ),
    },
    {
      id: "empfaenger",
      title: "Empfänger und Auftragsverarbeiter",
      content: (
        <>
          <P>
            Ich verkaufe Ihre Daten nicht und gebe sie nicht zu Werbezwecken weiter. Zugriff haben
            nur die folgenden Dienstleister, die als Auftragsverarbeiter auf Grundlage eines
            Vertrags nach <Ref>Art. 28 DSGVO</Ref> ausschließlich nach meinen Weisungen handeln:
          </P>
          <CardGrid>
            <InfoCard label="Hosting · Statistik" title={PROCESSORS.vercel.name}>
              <span className="block">
                Liefert die Website aus und erstellt, falls Sie einwilligen, die Statistiken.
              </span>
              <ProseLink href={PROCESSORS.vercel.privacyUrl}>Datenschutzerklärung</ProseLink>
            </InfoCard>
            <InfoCard label="Datenbank" title={PROCESSORS.neon.name}>
              <span className="block">
                Betreibt die Datenbank, in der Konto- und Einladungsdaten liegen.
              </span>
              <ProseLink href={PROCESSORS.neon.privacyUrl}>Datenschutzerklärung</ProseLink>
            </InfoCard>
          </CardGrid>
          <P>
            Darüber hinaus gebe ich Daten nur weiter, wenn ich gesetzlich dazu verpflichtet bin,
            etwa auf behördliche Anordnung (<Ref>Art. 6 Abs. 1 lit. c DSGVO</Ref>).
          </P>
        </>
      ),
    },
    {
      id: "drittland",
      title: "Übermittlung in Drittländer",
      content: (
        <P>
          Vercel und Neon haben ihren Sitz in den USA, sodass Daten dorthin übermittelt werden
          können. Für die USA besteht ein Angemessenheitsbeschluss der EU-Kommission (EU-U.S. Data
          Privacy Framework, <Ref>Art. 45 DSGVO</Ref>), der Übermittlungen an zertifizierte
          Unternehmen erlaubt. Soweit ein Anbieter nicht zertifiziert ist, erfolgt die Übermittlung
          auf Grundlage der Standardvertragsklauseln der EU-Kommission (
          <Ref>Art. 46 Abs. 2 lit. c DSGVO</Ref>), die Bestandteil der Verträge zur
          Auftragsverarbeitung sind.
        </P>
      ),
    },
    {
      id: "extern",
      title: "Schriftarten und externe Links",
      content: (
        <>
          <P>
            Alle Schriftarten werden von dieser Website selbst ausgeliefert. Beim Seitenaufruf wird
            keine Verbindung zu Google oder anderen Schriftanbietern aufgebaut.
          </P>
          <P>
            Links zu sozialen Netzwerken und anderen Websites sind einfache Verweise. Es werden
            keine Inhalte Dritter eingebettet; Daten gelangen erst an den jeweiligen Anbieter, wenn
            Sie einen Link anklicken. Ab dann gilt dessen Datenschutzerklärung.
          </P>
        </>
      ),
    },
    {
      id: "kontakt",
      title: "Kontakt per E-Mail",
      content: (
        <P>
          Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Adresse und Ihre Nachricht, um Ihr
          Anliegen zu beantworten. Rechtsgrundlage ist <Ref>Art. 6 Abs. 1 lit. b DSGVO</Ref>, soweit
          es um Ihr Konto geht, im Übrigen <Ref>Art. 6 Abs. 1 lit. f DSGVO</Ref>; mein berechtigtes
          Interesse liegt darin, Anfragen beantworten zu können. Ich lösche die Nachricht, sobald
          das Anliegen erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </P>
      ),
    },
    {
      id: "rechte",
      title: "Ihre Rechte",
      content: (
        <>
          <P>Ihnen stehen hinsichtlich Ihrer personenbezogenen Daten folgende Rechte zu:</P>
          <CardGrid>
            <InfoCard icon={MessageQuestionIcon} label="Art. 15 DSGVO" title="Auskunft">
              Welche Daten ich über Sie verarbeite, wozu und wie lange.
            </InfoCard>
            <InfoCard icon={Edit02Icon} label="Art. 16 DSGVO" title="Berichtigung">
              Korrektur unrichtiger und Vervollständigung unvollständiger Daten.
            </InfoCard>
            <InfoCard icon={Delete02Icon} label="Art. 17 DSGVO" title="Löschung">
              Löschung Ihrer Daten, soweit keine Pflicht zur Aufbewahrung besteht.
            </InfoCard>
            <InfoCard icon={StopCircleIcon} label="Art. 18 DSGVO" title="Einschränkung">
              Daten nur noch speichern lassen, aber nicht mehr anderweitig verarbeiten.
            </InfoCard>
            <InfoCard
              icon={ArrowDataTransferHorizontalIcon}
              label="Art. 20 DSGVO"
              title="Datenübertragbarkeit"
            >
              Ihre Daten in einem strukturierten, maschinenlesbaren Format erhalten.
            </InfoCard>
            <InfoCard icon={Cancel01Icon} label="Art. 21 DSGVO" title="Widerspruch">
              Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen.
            </InfoCard>
            <InfoCard icon={LockKeyIcon} label="Art. 7 Abs. 3 DSGVO" title="Widerruf">
              Eine erteilte Einwilligung jederzeit für die Zukunft zurücknehmen.
            </InfoCard>
            <InfoCard icon={JudgeIcon} label="Art. 77 DSGVO" title="Beschwerde">
              Sich bei einer Datenschutz-Aufsichtsbehörde beschweren.
            </InfoCard>
          </CardGrid>
          <P>
            Auskunft, Berichtigung, Datenübertragbarkeit und Löschung können Sie für Ihr Konto
            direkt im <ProseLink href="/profile">Profil</ProseLink> wahrnehmen. Für alles andere
            genügt eine formlose Nachricht an die oben genannten Kontaktdaten.
          </P>
          <P>
            Für eine Beschwerde können Sie sich an jede Datenschutz-Aufsichtsbehörde wenden,
            insbesondere an die im Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder
            des Orts des mutmaßlichen Verstoßes. Die Anschriften der Aufsichtsbehörden in
            Deutschland finden Sie{" "}
            <ProseLink href={SUPERVISORY_AUTHORITIES_URL}>
              beim Bundesbeauftragten für den Datenschutz
            </ProseLink>
            .
          </P>
        </>
      ),
    },
    {
      id: "widerspruch",
      title: "Widerspruchsrecht",
      content: (
        <Callout icon={Cancel01Icon} title="Ihr Widerspruchsrecht nach Art. 21 DSGVO">
          <P>
            Soweit ich Ihre Daten auf Grundlage von <Ref>Art. 6 Abs. 1 lit. f DSGVO</Ref>{" "}
            verarbeite, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
            ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen. Ich verarbeite die
            Daten dann nicht mehr, es sei denn, ich kann zwingende schutzwürdige Gründe für die
            Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die
            Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
          </P>
          <P>Der Widerspruch ist formlos an die oben genannten Kontaktdaten möglich.</P>
        </Callout>
      ),
    },
    {
      id: "pflicht",
      title: "Bereitstellung und automatisierte Entscheidungen",
      content: (
        <P>
          Sie sind weder gesetzlich noch vertraglich verpflichtet, mir personenbezogene Daten
          bereitzustellen. Ohne die technisch übermittelten Daten kann die Website jedoch nicht
          ausgeliefert werden, und ohne die Angaben bei der Registrierung kann ich kein Konto für
          Sie anlegen. Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne
          von <Ref>Art. 22 DSGVO</Ref> findet nicht statt.
        </P>
      ),
    },
    {
      id: "sicherheit",
      title: "Datensicherheit",
      content: (
        <P>
          Die Verbindung zu dieser Website ist durchgehend per TLS verschlüsselt, erkennbar am
          Schloss-Symbol und an »https://« in der Adresszeile. Passwörter werden nur als Hash mit
          einem eigens für Passwörter entwickelten Verfahren gespeichert. Darüber hinaus treffe ich
          angemessene technische und organisatorische Maßnahmen, um Ihre Daten vor Verlust und
          unbefugtem Zugriff zu schützen (<Ref>Art. 32 DSGVO</Ref>).
        </P>
      ),
    },
    {
      id: "aenderungen",
      title: "Änderungen",
      content: (
        <P>
          Ich passe diese Datenschutzerklärung an, wenn sich die Website, die eingesetzten Dienste
          oder die Rechtslage ändern. Es gilt jeweils die hier veröffentlichte Fassung; das Datum
          oben auf der Seite zeigt, wann sie zuletzt geändert wurde.
        </P>
      ),
    },
  ];
}
