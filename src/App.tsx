import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Route = "/" | "/token" | "/litepaper" | "/privacy" | "/terms";
type LegalType = "privacy" | "terms";
type IconProps = { className?: string };
type CardItem = { title: string; text: string; icon: React.ComponentType<IconProps> };
type Meta = { title: string; description: string };

function icon(paths: string[]) {
  return function Icon({ className = "h-5 w-5" }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        {paths.map((d, i) => (
          <path key={i} d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    );
  };
}

const Heart = icon(["M12 20s-7-4.6-9-9.2C1.6 7.4 3.8 4 7.5 4c2 0 3.3 1 4.5 2.4C13.2 5 14.5 4 16.5 4 20.2 4 22.4 7.4 21 10.8 19 15.4 12 20 12 20Z", "M7.5 11h2l1.2-2.5 2.2 5 1.3-2.5H16.5"]);
const Arrow = icon(["M5 12h14", "M13 6l6 6-6 6"]);
const Menu = icon(["M4 7h16", "M4 12h16", "M4 17h16"]);
const Close = icon(["M6 6l12 12", "M18 6 6 18"]);
const Wallet = icon(["M4 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z", "M4 9h14a2 2 0 0 1 2 2v1h-4a2 2 0 0 0 0 4h4"]);
const Activity = icon(["M3 12h4l2.5-5 4 10 2.5-5H21"]);
const Shield = icon(["M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3Z", "M9.5 12 11 13.5 14.5 10"]);
const User = icon(["M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8", "M5 20c1.7-3.3 4-5 7-5s5.3 1.7 7 5"]);
const Phone = icon(["M7 2.5h10v19H7z", "M11 5.5h2"]);
const Globe = icon(["M3 12h18", "M12 3c2.8 3 2.8 15 0 18", "M12 3c-2.8 3-2.8 15 0 18", "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"]);
const FileText = icon(["M8 3h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z", "M14 3v4h4", "M9 12h6", "M9 16h6"]);
const Copy = icon(["M9 9h10v10H9z", "M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"]);
const External = icon(["M14 5h5v5", "M10 14 19 5", "M19 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"]);
const Grid = icon(["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"]);
const Lock = icon(["M5 11h14v10H5z", "M8 11V8a4 4 0 1 1 8 0v3"]);
const Mail = icon(["M3 5h18v14H3z", "m5 7 7 6 7-6"]);
const Chat = icon(["M20 11.5A7.5 7.5 0 0 1 12.5 19H8l-4 2 1.3-4.1A7.5 7.5 0 1 1 20 11.5Z"]);
const Github = icon(["M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.5-.2.5-.4v-1.7c-2.2.5-2.7-.9-2.7-.9-.4-1-.9-1.3-.9-1.3-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.7.8-2.3-.1-.2-.4-1 .1-2.2 0 0 .7-.2 2.3.8a7.8 7.8 0 0 1 4.2 0c1.6-1 2.3-.8 2.3-.8.5 1.2.2 2 .1 2.2.5.6.8 1.4.8 2.3 0 3.1-1.9 3.8-3.7 4 .3.2.5.7.5 1.5v2.3c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5Z"]);

const PROJECT = {
  name: "MedAxis",
  tagline: "Digital Health. Unified Records. Rewarded Participation.",
  description: "A future-ready digital health ecosystem where users can store medical data in one place, participate in the platform, and unlock token-based rewards as the product evolves.",
  ticker: "MDX",
  network: "Ethereum",
  contract: "0x8F31a4F2C45D8B1e7A91D3A1bB51C9F2eA72C4D1",
  explorer: "#",
  buy: "#",
  email: "contact@medaxis.io",
  socials: { x: "#", telegram: "#", discord: "#", github: "#" },
  totalSupply: "1,000,000,000 MDX",
  maxSupply: "1,000,000,000 MDX",
};

const ROUTES: Route[] = ["/", "/token", "/litepaper", "/privacy", "/terms"];
const NAV: Array<[string, string]> = [["Vision", "#vision"], ["How it works", "#how"], ["Benefits", "#benefits"], ["App", "#app"], ["Token", "#token"], ["Roadmap", "#roadmap"], ["Community", "#community"]];

const FEATURES: CardItem[] = [
  { icon: User, title: "Unified Health Profile", text: "One personal space for records, history, and access." },
  { icon: Globe, title: "Portable Data Access", text: "Designed for easier access to health information from one digital environment." },
  { icon: Wallet, title: "Token Participation", text: "Users become active participants through token-based mechanics." },
  { icon: Phone, title: "Future App Experience", text: "The product vision extends into mobile and web app usage." },
];

const BENEFITS: CardItem[] = [
  { icon: Grid, title: "Everything in one place", text: "A clearer structure for medical history and future access." },
  { icon: FileText, title: "Faster record visibility", text: "Easier review of lab history and essential data." },
  { icon: Globe, title: "Designed for portability", text: "Created with long-term cross-context accessibility in mind." },
  { icon: Shield, title: "User-centered ownership", text: "The user stays at the center of the ecosystem." },
  { icon: Heart, title: "Health dashboard convenience", text: "A single environment is easier than scattered services." },
  { icon: Activity, title: "Ecosystem participation", text: "Users are rewarded for active engagement." },
];

const UTILITY: CardItem[] = [
  { icon: Wallet, title: "Earn token rewards", text: "Participation and activity can be tied to reward mechanics." },
  { icon: Grid, title: "Holder-based benefits", text: "Token holders may receive discounts and perks." },
  { icon: Activity, title: "Wearable-linked incentives", text: "Future integrations can support activity-based reward models." },
  { icon: Phone, title: "Future feature access", text: "The token can support selected ecosystem functions." },
  { icon: Shield, title: "Early ecosystem role", text: "Users join before the product reaches full app maturity." },
  { icon: Mail, title: "Growth-aligned participation", text: "The utility layer supports community and product growth." },
];

const APPS: CardItem[] = [
  { icon: Grid, title: "Dashboard", text: "Health summary, quick metrics, and ecosystem activity." },
  { icon: User, title: "Medical profile", text: "Blood type, allergies, prescriptions, and essential fields." },
  { icon: FileText, title: "Lab history", text: "Structured results and historical records." },
  { icon: Activity, title: "Wearable sync", text: "Future activity integrations and step-linked engagement." },
  { icon: Wallet, title: "Rewards panel", text: "Track participation, token rewards, and perks." },
  { icon: Lock, title: "Secure sharing", text: "Permission-based access flows for profile presentation." },
];

const TOKEN_UTILITY: CardItem[] = [
  { icon: Wallet, title: "Reward instrument", text: "Supports token-based participation and reward logic." },
  { icon: Grid, title: "Utility layer", text: "Integrated into ecosystem benefits, not a meme asset." },
  { icon: Shield, title: "Holder advantages", text: "Supports discounts and access-linked benefits later." },
  { icon: Phone, title: "App-connected future", text: "Tied to product evolution and future features." },
];

const STEPS = [
  { num: "01", title: "Create your profile", text: "Set up a personal digital identity layer for future health data." },
  { num: "02", title: "Add or connect records", text: "Upload or connect medical information into a single structure." },
  { num: "03", title: "Keep history together", text: "Store lab results, prescriptions, allergies, and key details in one place." },
  { num: "04", title: "Participate and earn", text: "Receive token-based rewards for ecosystem activity and engagement." },
  { num: "05", title: "Use the future dashboard", text: "Move toward a richer app experience with sync and insights." },
];

const ROADMAP = [
  { phase: "Phase 1", status: "Completed", points: ["Branding", "Website launch", "Community setup"] },
  { phase: "Phase 2", status: "Current", points: ["Token launch", "Liquidity deployment", "Market presence"] },
  { phase: "Phase 3", status: "Next", points: ["MVP app concept", "Personal dashboard", "Health profile architecture"] },
  { phase: "Phase 4", status: "Planned", points: ["Wearable integration", "Step-based rewards", "Subscription model"] },
  { phase: "Phase 5", status: "Future", points: ["Full app release", "Record portability", "International expansion"] },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isInternalRoute(href: string): href is Route {
  return (ROUTES as string[]).includes(href);
}

function normalizeHashNavigation(currentPathname: string, href: string) {
  return !href.startsWith("#") ? href : currentPathname === "/" ? href : `/${href}`;
}

function getPageMeta(pathname: string): Meta {
  const map: Record<Route, Meta> = {
    "/": { title: `${PROJECT.name} — Digital Health Ecosystem`, description: "Unified health records, future app experience, and token-enabled participation in a premium digital health ecosystem." },
    "/token": { title: `${PROJECT.ticker} Token — ${PROJECT.name}`, description: "Official token page with contract, network, supply, utility, and market references." },
    "/litepaper": { title: `${PROJECT.name} Litepaper`, description: "Project overview, problem, solution, token role, roadmap, and future application vision." },
    "/privacy": { title: `Privacy Policy — ${PROJECT.name}`, description: "Privacy information for the official project website." },
    "/terms": { title: `Terms of Use — ${PROJECT.name}`, description: "Terms of use for the official project website." },
  };
  return map[(ROUTES as string[]).includes(pathname) ? (pathname as Route) : "/"];
}

function runSelfTests() {
  const cases: Array<[unknown, unknown]> = [
    [isInternalRoute("/"), true],
    [isInternalRoute("/token"), true],
    [isInternalRoute("/missing"), false],
    [normalizeHashNavigation("/", "#community"), "#community"],
    [normalizeHashNavigation("/token", "#community"), "/#community"],
    [normalizeHashNavigation("/token", "/privacy"), "/privacy"],
    [getPageMeta("/").title, `${PROJECT.name} — Digital Health Ecosystem`],
    [getPageMeta("/oops").title, `${PROJECT.name} — Digital Health Ecosystem`],
    [NAV.length > 0, true],
    [FEATURES.length, 4],
    [ROADMAP.length, 5],
    [TOKEN_UTILITY.length, 4],
    [APPS.length, 6],
    [STEPS.length, 5],
  ];
  cases.forEach(([actual, expected], i) => {
    console.assert(actual === expected, `test ${i + 1} failed: expected ${String(expected)}, got ${String(actual)}`);
  });
}

if (typeof window !== "undefined") runSelfTests();

function Section({ id, eyebrow, title, description, children }: { id: string; eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10 max-w-3xl">
        <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
      </motion.div>
      {children}
    </section>
  );
}

function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl", className)}>{children}</div>;
}

function CardGrid({ items, cols = "md:grid-cols-2 xl:grid-cols-3" }: { items: CardItem[]; cols?: string }) {
  return (
    <div className={cn("grid gap-4", cols)}>
      {items.map(({ icon: Icon, title, text }) => (
        <motion.div key={title} {...fadeUp}>
          <GlassCard className="h-full">
            <Icon className="h-6 w-6 text-cyan-200" />
            <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function TopGlow() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.14),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
    </>
  );
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const isHome = path === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"><Heart className="h-5 w-5" /></div>
          <div>
            <div className="text-sm font-semibold tracking-[0.22em] text-white">{PROJECT.name}</div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Digital health ecosystem</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {isHome ? NAV.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</a>) : null}
          <a href="/token" className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20">Token</a>
        </nav>
        <button onClick={() => setOpen((v) => !v)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden" aria-label="Open menu">
          {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300" onClick={() => setOpen(false)}>{label}</a>)}
            <a href="/token" className="text-sm font-medium text-cyan-200" onClick={() => setOpen(false)}>Token</a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function TokenStrip() {
  const [copied, setCopied] = useState(false);

  const copyContract = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROJECT.contract);
      } else {
        const input = document.createElement("input");
        input.value = PROJECT.contract;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <GlassCard className="mt-8 p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
        <div><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Token</div><div className="mt-1 text-sm font-semibold text-white">{PROJECT.ticker}</div></div>
        <div><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Network</div><div className="mt-1 text-sm font-semibold text-white">{PROJECT.network}</div></div>
        <div className="sm:col-span-2 lg:col-span-1"><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Contract</div><div className="mt-1 truncate text-sm font-semibold text-white">{PROJECT.contract}</div></div>
        <div className="flex flex-wrap gap-2 lg:justify-end"><button onClick={copyContract} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"><Copy className="h-4 w-4" />{copied ? "Copied" : "Copy"}</button><a href={PROJECT.explorer} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"><External className="h-4 w-4" />Explorer</a></div>
      </div>
    </GlassCard>
  );
}

function HeroVisual() {
  const rows = [["Blood type", "O+"], ["Allergies", "Penicillin"], ["Prescriptions", "2 active"], ["Lab history", "18 records"]];
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <GlassCard className="relative overflow-hidden p-5 sm:p-6">
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(90deg,rgba(34,211,238,0.18),rgba(59,130,246,0.08),transparent)]" />
        <div className="grid gap-4">
          <GlassCard className="p-4">
            <div className="mb-3 flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Future app preview</div><div className="mt-1 text-lg font-semibold text-white">Unified health dashboard</div></div><div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Connected</div></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"><div className="flex items-center gap-2 text-sm font-medium text-slate-200"><Activity className="h-4 w-4 text-cyan-200" />Daily activity</div><div className="mt-4 text-3xl font-semibold text-white">10,842</div><div className="mt-1 text-sm text-slate-400">Steps synced from wearables</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"><div className="flex items-center gap-2 text-sm font-medium text-slate-200"><Wallet className="h-4 w-4 text-cyan-200" />Reward balance</div><div className="mt-4 text-3xl font-semibold text-white">420 MDX</div><div className="mt-1 text-sm text-slate-400">Participation-based rewards</div></div>
            </div>
          </GlassCard>
          <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="p-4"><div className="flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Medical profile</div><div className="mt-1 text-lg font-semibold text-white">Portable health summary</div></div><Shield className="h-5 w-5 text-cyan-200" /></div><div className="mt-4 grid gap-3">{rows.map(([k, v]) => <div key={k} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"><span className="text-sm text-slate-400">{k}</span><span className="text-sm font-medium text-white">{v}</span></div>)}</div></GlassCard>
            <GlassCard className="p-4"><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Quick access</div><div className="mt-1 text-lg font-semibold text-white">Profile share</div><div className="mt-5 flex h-48 items-center justify-center rounded-3xl border border-cyan-400/20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_55%)]"><div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8"><Lock className="mx-auto h-14 w-14 text-cyan-200" /><div className="mt-3 text-center text-sm text-slate-300">Secure access layer</div></div></div></GlassCard>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <TopGlow />
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp}>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200">Digital health ecosystem • web3 layer • future app</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{PROJECT.tagline}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{PROJECT.description}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href={PROJECT.buy} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100">Buy Token<Arrow className="h-4 w-4" /></a><a href="/litepaper" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">Read Litepaper</a><a href="#community" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">Join Community</a></div>
            <TokenStrip />
          </motion.div>
          <motion.div {...fadeUp}><HeroVisual /></motion.div>
        </div>
      </section>

      <Section id="vision" eyebrow="What we build" title="A unified health profile built for the next era of digital care" description="The platform is designed to bring fragmented medical information into one future-ready ecosystem where users can manage personal health data, participate in the product, and benefit from token-enabled mechanics."><CardGrid items={FEATURES} cols="md:grid-cols-2 xl:grid-cols-4" /></Section>
      <Section id="how" eyebrow="How it works" title="A simple user flow with a bigger ecosystem vision behind it" description="Create a profile, connect your data, keep your history in one place, and participate in a health-focused ecosystem that evolves into a full application."><div className="grid gap-4 lg:grid-cols-5">{STEPS.map(({ num, title, text }) => <motion.div key={num} {...fadeUp}><GlassCard className="h-full"><div className="text-sm font-semibold tracking-[0.24em] text-cyan-200">{num}</div><h3 className="mt-4 text-lg font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></GlassCard></motion.div>)}</div></Section>
      <Section id="benefits" eyebrow="Why it matters" title="Built around real data friction, user convenience, and future participation" description="Health information is often fragmented across clinics, apps, and documents. This concept brings those pieces closer together and gives users a more active role in the ecosystem."><CardGrid items={BENEFITS} /></Section>
      <Section id="utility" eyebrow="Utility & benefits" title="Why users would want to participate" description="The token is presented as an ecosystem layer that supports participation, unlocks future perks, and aligns users with the long-term product direction."><CardGrid items={UTILITY} /></Section>
      <Section id="app" eyebrow="Future app" title="A visual direction for the product beyond the website" description="This section shows how the ecosystem can evolve into a usable interface: a personal dashboard, health profile, records view, rewards panel, and secure access tools."><CardGrid items={APPS} /></Section>
      <Section id="token" eyebrow="Token" title="An official ecosystem token page, already integrated into the core site experience" description="The token is presented as part of the project infrastructure: visible, official, and connected to participation, future features, and community growth."><div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"><motion.div {...fadeUp}><GlassCard className="h-full"><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Official token card</div><div className="mt-3 text-3xl font-semibold text-white">{PROJECT.ticker}</div><div className="mt-2 text-sm text-slate-300">{PROJECT.name} ecosystem token</div><div className="mt-6 space-y-4">{[["Network", PROJECT.network], ["Contract", PROJECT.contract], ["Total supply", PROJECT.totalSupply], ["Max supply", PROJECT.maxSupply]].map(([k, v]) => <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">{k}</div><div className="mt-2 break-all text-sm font-medium text-white">{v}</div></div>)}</div><div className="mt-6 flex flex-wrap gap-3"><a href="/token" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">View token page<Arrow className="h-4 w-4" /></a><a href={PROJECT.buy} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">Buy Token</a></div></GlassCard></motion.div><motion.div {...fadeUp}><CardGrid items={TOKEN_UTILITY} cols="sm:grid-cols-2" /></motion.div></div></Section>
      <Section id="roadmap" eyebrow="Roadmap" title="A phased rollout from brand launch to full app ecosystem" description="The roadmap shows clear progression from website and token presence to app architecture, wearable integrations, and broader health ecosystem expansion."><div className="relative grid gap-4 lg:grid-cols-5"><div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-cyan-400/0 via-cyan-300/40 to-cyan-400/0 lg:block" />{ROADMAP.map(({ phase, status, points }, idx) => <motion.div key={phase} {...fadeUp}><GlassCard className={cn("relative h-full", idx === 0 && "border-cyan-400/30 bg-cyan-400/[0.07]")}><div className="mb-4 flex items-center justify-between"><div className="text-lg font-semibold text-white">{phase}</div><div className={cn("rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]", idx === 0 ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-100" : "border border-white/10 bg-white/5 text-slate-300")}>{status}</div></div><ul className="space-y-3 text-sm text-slate-300">{points.map((point) => <li key={point} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" /><span>{point}</span></li>)}</ul></GlassCard></motion.div>)}</div></Section>
      <Section id="community" eyebrow="Community" title="Official channels for updates, community growth, and ecosystem visibility" description="The website should feel live and official. This section gives users clear next steps to follow the project, join early, and stay connected to launches and product updates."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[[Chat, "X / Twitter", PROJECT.socials.x], [Chat, "Telegram", PROJECT.socials.telegram], [Grid, "Discord", PROJECT.socials.discord], [Github, "GitHub", PROJECT.socials.github]].map(([Icon, label, href]) => <motion.a key={label} {...fadeUp} href={href} className="block"><GlassCard className="h-full transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]"><Icon className="h-6 w-6 text-cyan-200" /><h3 className="mt-5 text-lg font-semibold text-white">{label}</h3><div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300">Follow updates<External className="h-4 w-4" /></div></GlassCard></motion.a>)}</div><motion.div {...fadeUp} className="mt-10"><GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-xl font-semibold text-white">Stay early. Follow the build.</div><p className="mt-2 text-sm text-slate-300">Join the community and track progress from ecosystem rollout to app development milestones.</p></div><a href={PROJECT.socials.telegram} className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100">Join the community<Arrow className="h-4 w-4" /></a></GlassCard></motion.div></Section>
    </main>
  );
}

function TokenPage() {
  const info = [["Token name", PROJECT.name], ["Ticker", PROJECT.ticker], ["Chain", PROJECT.network], ["Contract", PROJECT.contract], ["Total supply", PROJECT.totalSupply], ["Max supply", PROJECT.maxSupply]];
  const supply = [["Community", "35%"], ["Ecosystem", "20%"], ["Development", "15%"], ["Liquidity", "20%"], ["Reserve", "10%"]];
  const links = [["Buy token", PROJECT.buy], ["Explorer", PROJECT.explorer], ["Liquidity pair", "#"], ["Chart", "#"]];
  const faq = [["What is the token used for?", "The token supports ecosystem participation, rewards, and future utility-linked mechanics."], ["Is the token connected to the future app?", "Yes. The token is part of the broader ecosystem and product direction."], ["Do holders receive benefits?", "Holder-related benefits can include discounts and selected ecosystem perks."], ["Where can I verify the contract?", "The official contract address and explorer link are listed on this page and in the main website."]];

  return (
    <main className="relative overflow-hidden">
      <TopGlow />
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassCard><div className="text-xs uppercase tracking-[0.24em] text-slate-400">Token hero</div><h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{PROJECT.ticker}</h1><p className="mt-4 text-base leading-7 text-slate-300">{PROJECT.name} token functions as a participation and utility layer within the broader digital health ecosystem.</p><div className="mt-8 flex flex-wrap gap-3"><a href={PROJECT.buy} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100">Buy Token</a><a href={PROJECT.explorer} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">Open Explorer</a></div></GlassCard>
          <GlassCard><div className="grid gap-4 sm:grid-cols-2">{info.map(([k, v]) => <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="text-xs uppercase tracking-[0.2em] text-slate-400">{k}</div><div className="mt-2 break-all text-sm font-medium text-white">{v}</div></div>)}</div></GlassCard>
        </motion.div>
      </section>
      <Section id="token-utility" eyebrow="Token utility" title="Utility designed around ecosystem participation" description="The token should be understood as an infrastructure layer inside the project rather than the sole reason the project exists."><CardGrid items={TOKEN_UTILITY} cols="md:grid-cols-2 xl:grid-cols-4" /></Section>
      <Section id="supply" eyebrow="Supply & distribution" title="A clean official block for token economics" description="If final allocation is still in progress, this block can remain simplified while still presenting the token professionally."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{supply.map(([label, value]) => <GlassCard key={label}><div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div><div className="mt-3 text-3xl font-semibold text-white">{value}</div></GlassCard>)}</div><p className="mt-4 text-sm text-slate-400">Final allocation may be updated after deployment and official publication.</p></Section>
      <Section id="markets" eyebrow="Market links" title="Official references for trading and verification" description="This area is designed for DEX, chart, pair, explorer, and future market references."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{links.map(([label, href]) => <a key={label} href={href}><GlassCard className="transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]"><div className="text-lg font-semibold text-white">{label}</div><div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300">Open link<External className="h-4 w-4" /></div></GlassCard></a>)}</div></Section>
      <Section id="token-faq" eyebrow="FAQ" title="Common token questions" description="A simple FAQ section helps the page feel complete and official."><div className="grid gap-4 md:grid-cols-2">{faq.map(([q, a]) => <GlassCard key={q}><div className="text-lg font-semibold text-white">{q}</div><p className="mt-3 text-sm leading-7 text-slate-300">{a}</p></GlassCard>)}</div></Section>
    </main>
  );
}

function LitepaperPage() {
  const sections = [["1. Project overview", "The project is designed as a health-tech and web3 ecosystem where personal medical information can evolve into a structured, accessible, and future-ready user profile."], ["2. The problem", "Medical data is often fragmented across clinics, apps, lab systems, and documents. Users rarely have a single convenient profile for storing and presenting important health information."], ["3. The solution", "A unified digital health profile that helps users store key information in one place and participate in a broader platform experience."], ["4. Role of the token", "The token acts as a reward and utility layer, supporting user participation, holder-linked benefits, and future ecosystem mechanics."], ["5. User cases", "Example use cases include profile creation, record organization, wearable-linked activity flows, dashboard interactions, and permission-based access presentation."], ["6. Roadmap", "The roadmap moves from website and token rollout to app architecture, wearable integrations, subscription logic, and broader ecosystem expansion."], ["7. Future application", "The longer-term vision includes a mobile and web interface with a health dashboard, records history, personal medical profile, rewards panel, and access tools."], ["8. Disclaimer", "This document is for informational purposes only and does not constitute financial, investment, or medical advice. Product scope and ecosystem details may evolve over time."]];
  return <main className="relative overflow-hidden"><TopGlow /><section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><GlassCard className="p-8 sm:p-10"><div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Litepaper</div><h1 className="mt-4 text-4xl font-semibold text-white">{PROJECT.name} Litepaper</h1><p className="mt-4 text-base leading-8 text-slate-300">This litepaper presents the core concept of a digital health ecosystem designed around unified personal health records, user-centered participation, and a token-enabled utility layer.</p><div className="mt-10 space-y-10">{sections.map(([title, text]) => <div key={title}><h2 className="text-2xl font-semibold text-white">{title}</h2><p className="mt-4 text-base leading-8 text-slate-300">{text}</p></div>)}</div></GlassCard></section></main>;
}

function LegalPage({ type }: { type: LegalType }) {
  const isPrivacy = type === "privacy";
  return <main className="relative overflow-hidden"><TopGlow /><section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><GlassCard className="p-8 sm:p-10"><div className="text-xs uppercase tracking-[0.24em] text-cyan-200">{isPrivacy ? "Privacy Policy" : "Terms of Use"}</div><h1 className="mt-4 text-4xl font-semibold text-white">{isPrivacy ? "Privacy Policy" : "Terms of Use"}</h1><div className="mt-8 space-y-8 text-sm leading-8 text-slate-300">{isPrivacy ? <><p>This website may collect limited technical and contact information required for analytics, communication, and service improvement. Any future app-level handling of health-related or profile-related information must be governed by separate, more specific policies as the product evolves.</p><p>By using this website, you acknowledge that project materials may change over time, links may be updated, and information is provided on an informational basis unless stated otherwise.</p><p>For privacy-related requests, please contact {PROJECT.email}.</p></> : <><p>This website is provided for informational purposes regarding the project, ecosystem vision, and related token information. Nothing on the website constitutes financial, investment, legal, or medical advice.</p><p>Users are responsible for their own due diligence before interacting with any token, smart contract, or third-party service linked from the website.</p><p>Project scope, timelines, token mechanics, app features, and roadmap elements may be updated, expanded, delayed, or revised at any time.</p></>}</div></GlassCard></section></main>;
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"><Heart className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-semibold tracking-[0.22em] text-white">{PROJECT.name}</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Digital health ecosystem</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">A futuristic digital health platform concept built around unified medical records, tokenized participation, and the long-term vision of a personal health dashboard.</p>
          <div className="mt-5 text-sm text-slate-400">Token: {PROJECT.ticker}</div>
          <div className="mt-2 break-all text-sm text-slate-400">Contract: {PROJECT.contract}</div>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Navigation</div>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a href="/" className="text-slate-300 hover:text-white">Home</a>
            <a href="/token" className="text-slate-300 hover:text-white">Token</a>
            <a href="/litepaper" className="text-slate-300 hover:text-white">Litepaper</a>
            <a href="/privacy" className="text-slate-300 hover:text-white">Privacy</a>
            <a href="/terms" className="text-slate-300 hover:text-white">Terms</a>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Contacts</div>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
            <a href={PROJECT.socials.x}>X / Twitter</a>
            <a href={PROJECT.socials.telegram}>Telegram</a>
            <a href={PROJECT.socials.discord}>Discord</a>
            <a href={PROJECT.socials.github}>GitHub</a>
            <a href={`mailto:${PROJECT.email}`} className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{PROJECT.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs leading-6 text-slate-500 sm:px-6 lg:px-8">© 2026 {PROJECT.name}. All rights reserved. Information on this website is provided for informational purposes only and does not constitute financial advice. Project materials, token data, and roadmap items may be updated.</div>
    </footer>
  );
}

function SeoHead({ path }: { path: string }) {
  useEffect(() => {
    const current = getPageMeta(path);
    document.title = current.title;
    const upsertMeta = (name: string, content: string, attr = "name") => {
      let el = document.head.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    upsertMeta("description", current.description);
    upsertMeta("og:title", current.title, "property");
    upsertMeta("og:description", current.description, "property");
    upsertMeta("og:type", "website", "property");
  }, [path]);
  return null;
}

export default function DigitalHealthWeb3Site() {
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    const update = () => {
      const currentPath = window.location.pathname || "/";
      const normalizedPath = isInternalRoute(currentPath) ? currentPath : "/";
      if (currentPath !== normalizedPath) {
        history.replaceState({}, "", `${normalizedPath}${window.location.hash || ""}`);
      }
      setPath(normalizedPath);
    };
    update();
    window.addEventListener("popstate", update);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#")) {
        e.preventDefault();
        if (window.location.pathname !== "/") {
          history.pushState({}, "", normalizeHashNavigation(window.location.pathname, href));
          setPath("/");
          setTimeout(() => {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 20);
          return;
        }
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (isInternalRoute(href)) {
        e.preventDefault();
        history.pushState({}, "", href);
        setPath(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", update);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const page = useMemo(() => {
    if (path === "/token") return <TokenPage />;
    if (path === "/litepaper") return <LitepaperPage />;
    if (path === "/privacy") return <LegalPage type="privacy" />;
    if (path === "/terms") return <LegalPage type="terms" />;
    return <HomePage />;
  }, [path]);

  return <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-400/30 selection:text-white"><SeoHead path={path} /><Header path={path} />{page}<Footer /></div>;
}
