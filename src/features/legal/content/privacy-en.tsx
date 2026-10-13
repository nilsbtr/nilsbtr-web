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

/**
 * The privacy policy in English, a courtesy translation of the German one.
 * Keep both in step: every change to one belongs in the other.
 */
export function getPrivacySectionsEn(operator: Operator): LegalSection[] {
  return [
    {
      id: "ueberblick",
      title: "At a glance",
      content: (
        <>
          <P>
            This is my personal website. I collect as little data as I can, and this page explains
            what it is, why I need it and what rights you have.
          </P>
          <CardGrid>
            <InfoCard icon={Shield01Icon} title="No tracking, no ads">
              No advertising or tracking cookies, and your data is never sold or shared for
              advertising.
            </InfoCard>
            <InfoCard icon={Analytics01Icon} title="Analytics only with consent">
              Vercel&apos;s cookieless analytics only run once you agree, and you can switch them
              off at any time.
            </InfoCard>
            <InfoCard icon={UserShield01Icon} title="Accounts by invitation">
              For an account I only store what signing in and running it requires.
            </InfoCard>
            <InfoCard icon={FileExportIcon} title="Your data, your call">
              Download all your account data or delete your account from your profile in a few
              clicks.
            </InfoCard>
          </CardGrid>
        </>
      ),
    },
    {
      id: "verantwortlicher",
      title: "Controller",
      content: (
        <>
          <P>
            The controller responsible for processing personal data on this website under the
            General Data Protection Regulation (GDPR) is:
          </P>
          <OperatorCard operator={operator} lang="en" />
          <P>
            For questions about your data or to exercise your rights, an informal message to these
            contact details is enough. I have not appointed a data protection officer, as the law
            does not require one.
          </P>
        </>
      ),
    },
    {
      id: "hosting",
      title: "Hosting and server logs",
      content: (
        <>
          <P>
            This website is hosted by {PROCESSORS.vercel.name}, {PROCESSORS.vercel.address}. With
            every page request your browser sends data that Vercel processes in server logs:
          </P>
          <List
            items={[
              "IP address of the requesting device",
              "date and time of the request",
              "requested address (URL) and HTTP status code",
              "previously visited page (referrer), if your browser sends it",
              "browser and operating system (user agent)",
              "amount of data transferred",
            ]}
          />
          <P>
            This is necessary to deliver the website and to keep it secure and stable, for example
            to detect and fend off attacks. The legal basis is <Ref>Art. 6(1)(f) GDPR</Ref>; my
            legitimate interest is running the website securely and reliably. Depending on the
            Vercel plan, the logs are deleted automatically after one hour and at most 30 days. They
            are not combined with other data.
          </P>
          <P>
            To limit sign-in and sign-up attempts, and so protect passwords from being guessed, the
            server counts requests per IP address for a few seconds at a time in memory. These
            counters are never stored permanently. The legal basis is again{" "}
            <Ref>Art. 6(1)(f) GDPR</Ref>.
          </P>
          <P>
            Vercel processes the data as a processor, only on my instructions, under a data
            processing agreement in line with <Ref>Art. 28 GDPR</Ref>. See{" "}
            <ProseLink href={PROCESSORS.vercel.privacyUrl}>Vercel&apos;s privacy policy</ProseLink>{" "}
            for more.
          </P>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      content: (
        <>
          <P>
            This website sets no cookies for advertising, analytics or tracking. Only what a feature
            you asked for strictly needs is stored in your browser:
          </P>
          <StorageTable
            labels={{ purpose: "Purpose", duration: "Kept for" }}
            entries={[
              {
                name: "better-auth.session_token",
                kind: "Cookie",
                purpose:
                  "Keeps you signed in and is only set when you sign in. Over an encrypted connection its name carries the prefix __Secure-.",
                duration: "until you sign out, at most 7 days without use",
              },
              {
                name: "better-auth.invite_token",
                kind: "Cookie",
                purpose:
                  "Remembers a redeemed invitation until sign-up is complete. The __Secure- prefix applies here too.",
                duration: "10 minutes",
              },
              {
                name: "theme",
                kind: "Local storage",
                purpose: "Remembers whether you chose the light or the dark theme.",
                duration: "until you clear it in your browser",
              },
              {
                name: "analytics-consent",
                kind: "Local storage",
                purpose:
                  "Remembers your analytics choice, so you aren't asked again on every visit.",
                duration: "12 months, then you are asked again",
              },
            ]}
          />
          <P>
            Storing and reading this information is permitted under{" "}
            <Ref>Section 25(2) No. 2 TDDDG</Ref>, as it is strictly necessary for a service you
            requested. Any further processing rests on <Ref>Art. 6(1)(b) GDPR</Ref> (signing in) and{" "}
            <Ref>Art. 6(1)(f) GDPR</Ref> (showing the site the way you chose, keeping a record of
            your choice). You can delete cookies and locally stored data in your browser at any
            time.
          </P>
        </>
      ),
    },
    {
      id: ANALYTICS_SECTION_ID,
      title: "Analytics with Vercel",
      content: (
        <>
          <P>
            If you agree, I use <strong>Vercel Web Analytics</strong> and{" "}
            <strong>Vercel Speed Insights</strong> by {PROCESSORS.vercel.name} to see which pages
            are visited how often and how fast they load. This processes:
          </P>
          <List
            items={[
              "the page visited and the referrer",
              "browser, operating system and device type",
              "the country derived from the IP address",
              "loading performance metrics (Web Vitals)",
            ]}
          />
          <P>
            No cookies are set and no IP addresses are stored. To count visits, Vercel derives a
            hash from details of the request, which is discarded after 24 hours. You are not
            recognised across other websites and no profile of you is built; I only see aggregated
            statistics, which can no longer be traced to a single visit once the 24 hours are up.
          </P>
          <P>
            The legal basis is your consent under <Ref>Section 25(1) TDDDG</Ref> and{" "}
            <Ref>Art. 6(1)(a) GDPR</Ref>. Without it, the scripts are never loaded. You can withdraw
            your consent at any time with effect for the future, here or through &ldquo;Privacy
            settings&rdquo; at the bottom of every page. This does not affect the lawfulness of
            processing before the withdrawal.
          </P>
          <ConsentStatus lang="en" />
        </>
      ),
    },
    {
      id: "konto",
      title: "User accounts",
      content: (
        <>
          <P>Accounts are by invitation only. When you sign up and use your account, I process:</P>
          <List
            items={[
              <>
                <strong>Profile:</strong> username, name and email address
              </>,
              <>
                <strong>Credentials:</strong> your password, stored only as a cryptographic hash
                that can&apos;t be turned back into the password
              </>,
              <>
                <strong>Account management:</strong> role, when the account was created and changed,
                and a suspension with reason and duration, if any
              </>,
              <>
                <strong>Sessions:</strong> for each sign-in, IP address, browser identifier (user
                agent) and when the session started and expires
              </>,
            ]}
          />
          <P>
            Your avatar is drawn in your browser from your username. It is neither stored nor loaded
            from an outside service.
          </P>
          <P>
            The data is used to provide your account and sign you in, based on{" "}
            <Ref>Art. 6(1)(b) GDPR</Ref>. Session data and suspensions are also processed under{" "}
            <Ref>Art. 6(1)(f) GDPR</Ref>, to detect and prevent unauthorised access and abuse.
            Administrators of this website can view account data and manage accounts.
          </P>
          <P>
            Your account data is kept until you delete your account. Sessions expire after seven
            days without use and are deleted automatically at the next sign-in on the website.
          </P>
          <Callout icon={UserShield01Icon} title="In your hands">
            <P>
              In your <ProseLink href="/profile">profile</ProseLink> you can edit your details,
              download a complete copy of your data as a JSON file and permanently delete your
              account. Sessions and credentials are removed with it right away.
            </P>
          </Callout>
        </>
      ),
    },
    {
      id: "einladungen",
      title: "Invitations",
      content: (
        <P>
          When an administrator creates an invitation, I store a random code, its expiry, how often
          it may be used and the account that created it. For invitations that can be used more than
          once, I record when and by which account they were redeemed, until their last use. The
          legal basis is <Ref>Art. 6(1)(f) GDPR</Ref>; my legitimate interest is a closed group of
          users protected from abuse. As soon as an invitation is used up or revoked, I delete it
          along with these records; administrators remove expired ones. The link to your account
          ends at the latest when the account is deleted.
        </P>
      ),
    },
    {
      id: "empfaenger",
      title: "Recipients and processors",
      content: (
        <>
          <P>
            I don&apos;t sell your data or share it for advertising. Only the following service
            providers have access, as processors acting solely on my instructions under an agreement
            in line with <Ref>Art. 28 GDPR</Ref>:
          </P>
          <CardGrid>
            <InfoCard label="Hosting · Analytics" title={PROCESSORS.vercel.name}>
              <span className="block">
                Delivers the website and, if you agree, compiles the statistics.
              </span>
              <ProseLink href={PROCESSORS.vercel.privacyUrl}>Privacy policy</ProseLink>
            </InfoCard>
            <InfoCard label="Database" title={PROCESSORS.neon.name}>
              <span className="block">Runs the database that holds account and invite data.</span>
              <ProseLink href={PROCESSORS.neon.privacyUrl}>Privacy policy</ProseLink>
            </InfoCard>
          </CardGrid>
          <P>
            Beyond that, I only pass on data where the law requires me to, for example on an order
            from the authorities (<Ref>Art. 6(1)(c) GDPR</Ref>).
          </P>
        </>
      ),
    },
    {
      id: "drittland",
      title: "Transfers outside the EU",
      content: (
        <P>
          Vercel and Neon are based in the USA, so data may be transferred there. The European
          Commission has adopted an adequacy decision for the USA (EU-U.S. Data Privacy Framework,{" "}
          <Ref>Art. 45 GDPR</Ref>) that permits transfers to certified companies. Where a provider
          is not certified, transfers rely on the European Commission&apos;s standard contractual
          clauses (<Ref>Art. 46(2)(c) GDPR</Ref>), which are part of the data processing agreements.
        </P>
      ),
    },
    {
      id: "extern",
      title: "Fonts and external links",
      content: (
        <>
          <P>
            All fonts are served by this website itself. Loading a page makes no connection to
            Google or any other font provider.
          </P>
          <P>
            Links to social networks and other websites are plain links. No third-party content is
            embedded; a provider only receives data once you follow a link, and from then on their
            privacy policy applies.
          </P>
        </>
      ),
    },
    {
      id: "kontakt",
      title: "Contact by email",
      content: (
        <P>
          If you email me, I process your address and your message to answer you. The legal basis is{" "}
          <Ref>Art. 6(1)(b) GDPR</Ref> where it concerns your account, and otherwise{" "}
          <Ref>Art. 6(1)(f) GDPR</Ref>; my legitimate interest is being able to reply. I delete the
          message once the matter is settled, unless the law requires me to keep it.
        </P>
      ),
    },
    {
      id: "rechte",
      title: "Your rights",
      content: (
        <>
          <P>Regarding your personal data, you have the right to:</P>
          <CardGrid>
            <InfoCard icon={MessageQuestionIcon} label="Art. 15 GDPR" title="Access">
              Learn what data I process about you, why and for how long.
            </InfoCard>
            <InfoCard icon={Edit02Icon} label="Art. 16 GDPR" title="Rectification">
              Have incorrect data corrected and incomplete data completed.
            </InfoCard>
            <InfoCard icon={Delete02Icon} label="Art. 17 GDPR" title="Erasure">
              Have your data deleted, unless I am required to keep it.
            </InfoCard>
            <InfoCard icon={StopCircleIcon} label="Art. 18 GDPR" title="Restriction">
              Have your data only stored, but not otherwise processed.
            </InfoCard>
            <InfoCard
              icon={ArrowDataTransferHorizontalIcon}
              label="Art. 20 GDPR"
              title="Data portability"
            >
              Receive your data in a structured, machine-readable format.
            </InfoCard>
            <InfoCard icon={Cancel01Icon} label="Art. 21 GDPR" title="Objection">
              Object to processing based on legitimate interests.
            </InfoCard>
            <InfoCard icon={LockKeyIcon} label="Art. 7(3) GDPR" title="Withdrawal">
              Withdraw consent at any time with effect for the future.
            </InfoCard>
            <InfoCard icon={JudgeIcon} label="Art. 77 GDPR" title="Complaint">
              Lodge a complaint with a data protection supervisory authority.
            </InfoCard>
          </CardGrid>
          <P>
            For your account, you can exercise access, rectification, portability and erasure
            directly in your <ProseLink href="/profile">profile</ProseLink>. For anything else, an
            informal message to the contact details above is enough.
          </P>
          <P>
            You can complain to any data protection supervisory authority, in particular the one in
            the member state where you live, work or where the alleged infringement took place. The
            addresses of the German authorities are listed{" "}
            <ProseLink href={SUPERVISORY_AUTHORITIES_URL}>
              by the Federal Commissioner for Data Protection
            </ProseLink>
            .
          </P>
        </>
      ),
    },
    {
      id: "widerspruch",
      title: "Right to object",
      content: (
        <Callout icon={Cancel01Icon} title="Your right to object under Art. 21 GDPR">
          <P>
            Where I process your data based on <Ref>Art. 6(1)(f) GDPR</Ref>, you have the right to
            object to this processing at any time, on grounds relating to your particular situation.
            I will then stop processing it, unless I can demonstrate compelling legitimate grounds
            that override your interests, rights and freedoms, or the processing serves the
            establishment, exercise or defence of legal claims.
          </P>
          <P>You can object informally using the contact details above.</P>
        </Callout>
      ),
    },
    {
      id: "pflicht",
      title: "Providing data and automated decisions",
      content: (
        <P>
          You are under no legal or contractual obligation to provide personal data. Without the
          data your browser sends, however, the website can&apos;t be delivered, and without the
          details asked for at sign-up I can&apos;t create an account for you. There is no automated
          decision-making, including profiling, within the meaning of <Ref>Art. 22 GDPR</Ref>.
        </P>
      ),
    },
    {
      id: "sicherheit",
      title: "Security",
      content: (
        <P>
          Every connection to this website is encrypted with TLS, shown by the padlock and
          &ldquo;https://&rdquo; in the address bar. Passwords are only stored as a hash, using a
          method designed for passwords. Beyond that, I take appropriate technical and
          organisational measures to protect your data from loss and unauthorised access (
          <Ref>Art. 32 GDPR</Ref>).
        </P>
      ),
    },
    {
      id: "aenderungen",
      title: "Changes",
      content: (
        <P>
          I update this privacy policy when the website, the services it uses or the law change. The
          version published here always applies; the date at the top of the page shows when it last
          changed.
        </P>
      ),
    },
  ];
}
