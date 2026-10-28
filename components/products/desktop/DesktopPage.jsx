import Section, { H2 } from '@/components/site/Section';
import TrackedLink from '@/components/TrackedLink';
import Button from '@/components/site/Button';
import { CONTACT_SALES, SIGN_IN } from '@/lib/site';
import { DESKTOP } from '@/lib/desktop';
import Page, { Hero, Lead, UseCases, Closing } from '../Page';
import Faq from '../Faq';
import { HERO_RINGS, BAND_CLIP, BAND_RINGS } from '../rings';
import DesktopRings from './Rings';
import CopyLine from '../CopyLine';
import { VideoFrame } from '@/components/site/ProductMedia';

// Jobs built from what the app does (lib/desktop.js): real folders, a sandbox, your browser.
const USES = [
  { market: 'Accountants', job: 'A month of invoices, reconciled', line: 'Matches each invoice in the folder to the bank export, writes the reconciliation and asks before it goes online.' },
  { market: 'Lawyers', job: 'A matter folder, put in order', line: 'Reads every document in the folder, names each by date and party, and lists the ones still missing.' },
  { market: 'Developers', job: 'An app, built and shown', line: 'Builds and runs it in the sandbox, then opens it in your browser for you to try, once you allow it.' },
  { market: 'Analysts', job: 'Reports, gathered into one sheet', line: 'Downloads them with your browser into the chat\'s folder, then turns them into one spreadsheet.' },
];

const CAN = [
  ['Works on your real files', 'Point a chat at a folder, and it reads, writes and organises what is in it: documents, spreadsheets, code or data. No uploads, no syncing.'],
  ['Runs commands, safely', 'Builds, scripts, data processing and file conversions run in a sandbox on your computer, not on your computer itself.'],
  ['Shows you what it builds', 'When it starts a web app in its sandbox, it can open it in your browser for you to see, once you allow it.'],
  ['Runs several jobs at once', 'In a project, each thread works in its own copy of your folders. Press Stop, and the turn\'s changes are taken back.'],
];

const FAQ = [
  ['What is Surogate Desktop?', 'An app that connects your Surogate agent to your own computer. The agent keeps thinking in the cloud, and its hands work locally: it reads and edits the files in folders you choose, runs commands and browses the web in your own browser.'],
  ['Can it break my computer?', 'Every command runs in a lightweight virtual machine that the app starts for you. A chat\'s folder joins it only while that chat is working, and files you protect stay read-only.'],
  ['Which browsers does it use?', 'Chrome, Edge, Brave or Vivaldi, already installed on your computer, in a profile of its own. Downloads land in the chat\'s folder. The Snap build of Chromium is not supported.'],
  ['What happens when two threads change the same file?', 'When a thread\'s turn ends, its changes land in your folder. If someone changed the same file meanwhile, the thread asks you.'],
  ['Does it work on a company network?', 'Yes. Give the installer your company\'s CA certificate, and the app, your browsers and the commands the agent runs all trust it.'],
  ['How do I update or remove it?', 'It keeps itself up to date: "Restart to update" installs a new release. Removing it asks before it deletes your sign-in and browser profiles, and your folders are never touched.'],
];

export default function DesktopPage() {
  return (
    <Page>
      <Hero title="Meet" pose="computer" rest="Surogate Desktop."
        sub="Your AI with its own computer. It works on your files, runs commands in a sandbox and uses your browser, then hands back finished work."
        actions={<>
          <Button href="#install" size="lg" arrow event="download_clicked" eventProps={{ location: 'desktop_hero' }}>Download</Button>
          <Button href="#uses" size="lg" variant="secondary">See what it can do</Button>
        </>}
        rings={<DesktopRings className={HERO_RINGS} />}>
        <div className="mx-auto max-w-[880px]">
          <VideoFrame src="/media/loops/surogate-desktop-files.mp4" poster="/media/loops/surogate-desktop-files.jpg" className="-mx-4 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full" />
          <p className="m-0 mt-3 text-left text-[13px] text-ink/50 md:mt-4">A freight company's folder of scanned invoices: the agent reads each one, files it by supplier and logs it in a spreadsheet. Filmed on a demo business.</p>
        </div>
      </Hero>

      <Section id="uses">
        <Lead title="Finished work, on your own computer." sub="Give it a folder and a job. It hands back the result, in the folder." />
        <UseCases items={USES} />
      </Section>

      <Section id="how">
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <h2 className={H2.feature}>Its own computer. Your hand on it.</h2>
            <p className="mt-4 mb-0 max-w-[42ch] text-[16px] leading-[1.6] text-ink/65">
              It drives your browser in a profile of its own. Take it over for a sign-in at any moment, and the agent waits until you hand it back.
            </p>
          </div>
          <figure className="m-0">
            <VideoFrame src="/media/loops/surogate-desktop-browser.mp4" poster="/media/loops/surogate-desktop-browser.jpg" eager={false} className="-mx-4 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full" />
            <figcaption className="mt-3 text-[13px] text-ink/50">The agent opens a supplier portal, you sign in yourself, then hand the browser back and it reads off the open invoices. Filmed on a demo portal.</figcaption>
          </figure>
        </div>
        <ul className="m-0 mt-16 grid list-none gap-3 p-0 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {CAN.map(([t, d]) => (
            <li key={t} className="rounded-2xl bg-white p-6">
              <h3 className="m-0 text-[15px] font-[500]">{t}</h3>
              <p className="m-0 mt-2 text-[14px] leading-[1.55] text-ink/60">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="aubergine" id="private" className="relative isolate overflow-hidden" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className={BAND_CLIP}><DesktopRings dark className={BAND_RINGS} /></div>
        <div>
          <h2 className={H2.feature}>Private by design.</h2>
          <p className="mt-4 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-white/70">It sees the folder you give it, runs in a sandbox and asks before it goes anywhere new.</p>
        </div>
        <ul className="m-0 list-none border-b border-white/15 p-0">
          {DESKTOP.safe.map(([t, d]) => (
            <li key={t} className="border-t border-white/15 py-5">
              <p className="m-0 text-[15px] font-medium">{t}</p>
              <p className="m-0 mt-1.5 text-[14px] leading-[1.55] text-white/65">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="install" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>Download Surogate Desktop.</h2>
          <p className="mt-3 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-ink/65">Paste one line into a terminal, then open Surogate Desktop from your applications and sign in with your Surogate account.</p>
          <p className="mt-6 mb-0 text-[14px] text-ink/55">No account yet? <TrackedLink href={SIGN_IN} event="cta_signup_clicked" eventProps={{ location: 'desktop_install' }} className="!text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Create one free</TrackedLink>, with no card. <a href="/pricing/#individual" className="!text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">See the plans</a>.</p>
          <p className="mt-2 mb-0 text-[14px] text-ink/55">On Windows or a Mac? <a href={CONTACT_SALES} className="!text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Ask us for the installer</a>.</p>
        </div>
        <div className="min-w-0">
          <CopyLine text={DESKTOP.install} event="desktop_install_copied" location="desktop_install" />
          <ul className="m-0 mt-8 list-none border-b border-hairline p-0">
            {DESKTOP.requirements.map((r) => <li key={r} className="border-t border-hairline py-3.5 text-[15px] leading-[1.5] text-ink/70">{r}</li>)}
          </ul>
          <p className="m-0 mt-6 text-[13px] text-ink/50">On a network that inspects TLS, give the installer your company's CA:</p>
          <code className="mt-2 block overflow-x-auto whitespace-nowrap rounded-lg bg-stone px-3 py-2.5 font-mono text-[12px]">{DESKTOP.caCert}</code>
        </div>
      </Section>

      <Faq items={FAQ} />

      <Closing title="Give your AI a computer." peek="computer" line="One line to install. Your folders stay yours."
        action={<Button href="#install" size="lg" arrow event="download_clicked" eventProps={{ location: 'desktop_closing' }}>Download Surogate Desktop</Button>} />
    </Page>
  );
}
