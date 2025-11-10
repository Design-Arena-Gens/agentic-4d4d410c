"use client";

import {
  AlarmClock,
  BookOpen,
  Clapperboard,
  Coffee,
  Dumbbell,
  LucideIcon,
  MessageSquare,
  Mic,
  MoonStar,
  Music3,
  Radio,
  Sparkle,
  Sunrise,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Category =
  | "routine"
  | "learning"
  | "break"
  | "content"
  | "rest"
  | "exercise"
  | "creation"
  | "prep"
  | "live"
  | "engagement"
  | "relax"
  | "sleep";

type ScheduleItem = {
  id: number;
  label: string;
  title: string;
  details: string[];
  start: number;
  end: number;
  category: Category;
  icon: LucideIcon;
};

const toMinutes = (time: string) => {
  const [rawHour, rawMinute] = time.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    throw new Error(`Invalid time format: ${time}`);
  }

  if (hour === 24 && minute === 0) {
    return 24 * 60;
  }

  return hour * 60 + minute;
};

const SCHEDULE: ScheduleItem[] = [
  {
    id: 1,
    label: "7:00 AM",
    title: "ঘুম থেকে ওঠা",
    details: ["পানি পান", "ফ্রেশ হওয়া"],
    start: toMinutes("07:00"),
    end: toMinutes("07:20"),
    category: "routine",
    icon: Sunrise,
  },
  {
    id: 2,
    label: "7:20–8:00 AM",
    title: "সকাল রুটিন",
    details: ["সকালের নাস্তা", "হেয়ার কেয়ার"],
    start: toMinutes("07:20"),
    end: toMinutes("08:00"),
    category: "routine",
    icon: AlarmClock,
  },
  {
    id: 3,
    label: "8:00–10:00 AM",
    title: "শেখা",
    details: ["SEO", "Storytelling", "Social Media Management"],
    start: toMinutes("08:00"),
    end: toMinutes("10:00"),
    category: "learning",
    icon: BookOpen,
  },
  {
    id: 4,
    label: "10:00–10:30 AM",
    title: "বিরতি",
    details: ["বিশ্রাম", "চা বা পানি পান"],
    start: toMinutes("10:00"),
    end: toMinutes("10:30"),
    category: "break",
    icon: Coffee,
  },
  {
    id: 5,
    label: "10:30 AM–12:30 PM",
    title: "কনটেন্ট রিসার্চ + স্ক্রিপ্ট",
    details: ["রিসার্চ", "স্ক্রিপ্ট রাইটিং"],
    start: toMinutes("10:30"),
    end: toMinutes("12:30"),
    category: "content",
    icon: MessageSquare,
  },
  {
    id: 6,
    label: "12:30–1:30 PM",
    title: "লাঞ্চ ও বিশ্রাম",
    details: ["স্বাস্থ্যকর দুপুরের খাবার", "৩০ মিনিট দুপুরের ঘুম"],
    start: toMinutes("12:30"),
    end: toMinutes("13:30"),
    category: "rest",
    icon: UtensilsCrossed,
  },
  {
    id: 7,
    label: "1:30–2:30 PM",
    title: "ব্যায়াম",
    details: ["কার্ডিও", "স্ট্রেচিং", "ওয়ার্কআউট"],
    start: toMinutes("13:30"),
    end: toMinutes("14:30"),
    category: "exercise",
    icon: Dumbbell,
  },
  {
    id: 8,
    label: "2:30–6:30 PM",
    title: "কনটেন্ট ক্রিয়েশন",
    details: ["ভিডিও এডিটিং", "থাম্বনেইল ডিজাইন", "আপলোড প্রস্তুতি"],
    start: toMinutes("14:30"),
    end: toMinutes("18:30"),
    category: "creation",
    icon: Clapperboard,
  },
  {
    id: 9,
    label: "6:30–7:00 PM",
    title: "প্রস্তুতি",
    details: ["হালকা খাবার", "লাইভ সেটআপ তৈরি"],
    start: toMinutes("18:30"),
    end: toMinutes("19:00"),
    category: "prep",
    icon: Sparkle,
  },
  {
    id: 10,
    label: "7:00–10:00 PM",
    title: "লাইভ স্ট্রিম",
    details: ["YouTube", "Rooter.io"],
    start: toMinutes("19:00"),
    end: toMinutes("22:00"),
    category: "live",
    icon: Mic,
  },
  {
    id: 11,
    label: "10:00–10:30 PM",
    title: "পোস্ট-স্ট্রিম কাজ",
    details: ["ফিডব্যাক দেখা", "মন্তব্যের উত্তর"],
    start: toMinutes("22:00"),
    end: toMinutes("22:30"),
    category: "engagement",
    icon: Radio,
  },
  {
    id: 12,
    label: "10:30–11:30 PM",
    title: "রিল্যাক্স টাইম",
    details: ["মুভি বা সিরিজ", "পছন্দের মিউজিক", "নিজস্ব সময়"],
    start: toMinutes("22:30"),
    end: toMinutes("23:30"),
    category: "relax",
    icon: Music3,
  },
  {
    id: 13,
    label: "11:30 PM",
    title: "ঘুম",
    details: ["পরের দিনের প্রস্তুতি", "পূর্ণ বিশ্রাম"],
    start: toMinutes("23:30"),
    end: toMinutes("24:00"),
    category: "sleep",
    icon: MoonStar,
  },
];

const categoryMeta: Record<
  Category,
  { label: string; badgeClass: string; glow: string; background: string }
> = {
  routine: {
    label: "রুটিন",
    badgeClass: "bg-amber-200/80 text-amber-900 border border-amber-300/70",
    glow: "shadow-[0_0_24px] shadow-amber-300/50",
    background: "from-amber-100/70 via-amber-50 to-white/30",
  },
  learning: {
    label: "শেখা",
    badgeClass: "bg-sky-200/80 text-sky-900 border border-sky-400/60",
    glow: "shadow-[0_0_24px] shadow-sky-200/50",
    background: "from-sky-100/70 via-cyan-100/50 to-white/20",
  },
  break: {
    label: "বিরতি",
    badgeClass: "bg-rose-200/70 text-rose-900 border border-rose-300/60",
    glow: "shadow-[0_0_24px] shadow-rose-200/40",
    background: "from-rose-100/70 via-orange-50/60 to-white/20",
  },
  content: {
    label: "রিসার্চ",
    badgeClass: "bg-purple-200/80 text-purple-900 border border-purple-300/70",
    glow: "shadow-[0_0_24px] shadow-purple-300/40",
    background: "from-purple-100/70 via-fuchsia-100/40 to-white/20",
  },
  rest: {
    label: "বিশ্রাম",
    badgeClass: "bg-lime-200/80 text-lime-900 border border-lime-300/70",
    glow: "shadow-[0_0_24px] shadow-lime-200/40",
    background: "from-lime-100/70 via-emerald-50/60 to-white/20",
  },
  exercise: {
    label: "ব্যায়াম",
    badgeClass: "bg-emerald-200/80 text-emerald-900 border border-emerald-300/70",
    glow: "shadow-[0_0_24px] shadow-emerald-200/40",
    background: "from-emerald-100/70 via-green-100/50 to-white/20",
  },
  creation: {
    label: "ক্রিয়েশন",
    badgeClass: "bg-indigo-200/80 text-indigo-900 border border-indigo-300/70",
    glow: "shadow-[0_0_24px] shadow-indigo-300/40",
    background: "from-indigo-100/70 via-slate-100/40 to-white/20",
  },
  prep: {
    label: "প্রস্তুতি",
    badgeClass: "bg-cyan-200/80 text-cyan-900 border border-cyan-300/70",
    glow: "shadow-[0_0_24px] shadow-cyan-200/40",
    background: "from-cyan-100/70 via-blue-100/50 to-white/20",
  },
  live: {
    label: "লাইভ",
    badgeClass: "bg-orange-200/80 text-orange-900 border border-orange-300/70",
    glow: "shadow-[0_0_28px] shadow-orange-200/60",
    background: "from-orange-100/70 via-amber-100/50 to-white/20",
  },
  engagement: {
    label: "এনগেজমেন্ট",
    badgeClass: "bg-teal-200/80 text-teal-900 border border-teal-300/70",
    glow: "shadow-[0_0_24px] shadow-teal-200/40",
    background: "from-teal-100/70 via-emerald-100/40 to-white/20",
  },
  relax: {
    label: "রিল্যাক্স",
    badgeClass: "bg-pink-200/80 text-pink-900 border border-pink-300/70",
    glow: "shadow-[0_0_24px] shadow-pink-200/40",
    background: "from-pink-100/70 via-rose-100/40 to-white/20",
  },
  sleep: {
    label: "ঘুম",
    badgeClass: "bg-slate-200/80 text-slate-900 border border-slate-300/70",
    glow: "shadow-[0_0_28px] shadow-slate-300/50",
    background: "from-slate-100/80 via-slate-200/40 to-white/10",
  },
};

const phaseLabels = [
  { max: toMinutes("12:00"), label: "সকাল" },
  { max: toMinutes("17:00"), label: "দুপুর" },
  { max: toMinutes("20:00"), label: "বিকাল" },
  { max: toMinutes("24:00"), label: "রাত" },
];

const toBnDigits = (value: number | string) => {
  const base = 0x09e6;

  return `${value}`
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 48 && code <= 57) {
        return String.fromCharCode(base + (code - 48));
      }
      return char;
    })
    .join("");
};

const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${toBnDigits(mins)} মিনিট`;
  }

  if (mins === 0) {
    return `${toBnDigits(hours)} ঘন্টা`;
  }

  return `${toBnDigits(hours)} ঘন্টা ${toBnDigits(mins)} মিনিট`;
};

const getPhase = (minutes: number) =>
  phaseLabels.find((phase) => minutes < phase.max)?.label ?? "দিন";

const findNextItem = (now: number) =>
  SCHEDULE.find((item) => now < item.start) ?? null;

export default function Home() {
  const [currentMinutes, setCurrentMinutes] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
    };

    update();

    const interval = setInterval(update, 60_000);

    return () => clearInterval(interval);
  }, []);

  const totalMinutes = useMemo(
    () =>
      SCHEDULE.reduce((sum, item) => {
        return sum + (item.end - item.start);
      }, 0),
    []
  );

  const categoryTotals = useMemo(() => {
    return SCHEDULE.reduce<Record<Category, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + (item.end - item.start);
      return acc;
    }, {} as Record<Category, number>);
  }, []);

  const focusHighlights = useMemo(
    () => [
      {
        label: "শেখা",
        value: formatMinutes(categoryTotals.learning ?? 0),
        hint: "দক্ষতা বাড়ানোর জন্য নির্ধারিত গভীর শেখার সময়",
      },
      {
        label: "কনটেন্ট",
        value: formatMinutes(
          (categoryTotals.content ?? 0) +
            (categoryTotals.creation ?? 0) +
            (categoryTotals.engagement ?? 0)
        ),
        hint: "প্রোডাকশন, সম্পাদনা ও দর্শকদের সাথে সংযোগ",
      },
      {
        label: "লাইভ স্ট্রিম",
        value: formatMinutes(categoryTotals.live ?? 0),
        hint: "মূল সম্প্রচারের জন্য ব্লক করা প্রাইম টাইম",
      },
    ],
    [categoryTotals]
  );

  const nextItem = useMemo(() => {
    if (currentMinutes === null) {
      return SCHEDULE[0];
    }

    const current = SCHEDULE.find(
      (item) => currentMinutes >= item.start && currentMinutes < item.end
    );

    if (current) {
      return current;
    }

    return findNextItem(currentMinutes) ?? SCHEDULE[0];
  }, [currentMinutes]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,106,255,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.15),_transparent_60%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 sm:px-10 lg:gap-16">
        <header className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.18em] text-slate-100/80 backdrop-blur">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Creator Day Blueprint
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              ডিজিটাল কনটেন্ট ক্রিয়েটরের পূর্ণ দিনের রুটিন
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-200/80 sm:text-lg">
              দিনের শুরু থেকে ঘুম-এর আগে পর্যন্ত প্রতিটি ধাপ সাজানো হয়েছে
              ফোকাস, প্রোডাক্টিভিটি এবং পুনরুদ্ধারের মধ্যে ভারসাম্য রেখে। এই
              শিডিউলটি আপনার কনটেন্ট-বিল্ডিং প্রক্রিয়াকে সংগঠিত রাখতে সহায়তা
              করবে।
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {focusHighlights.map((card) => (
              <div
                key={card.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur transition hover:bg-white/10"
              >
                <div className="absolute inset-x-0 -top-32 h-40 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                  {card.label}
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {card.value}
                </div>
                <p className="mt-2 text-sm text-slate-200/70">{card.hint}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/80 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-semibold text-white">বর্তমান ফোকাস:</span>{" "}
              {nextItem.title} ({nextItem.label})
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-200/70">
              {formatMinutes(totalMinutes)} মোট ফোকাস সময়
            </div>
          </div>
        </header>

        <section className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent md:block" />
          <div className="space-y-6">
            {SCHEDULE.map((item, index) => {
              const meta = categoryMeta[item.category];
              const phase = getPhase(item.start);
              const isActive =
                currentMinutes !== null &&
                currentMinutes >= item.start &&
                currentMinutes < item.end;
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="relative md:pl-12"
                >
                  <div className="absolute left-4 top-8 hidden h-[calc(100%-2rem)] w-[1px] bg-white/15 md:block" />
                  <div className="relative grid gap-5 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-6 shadow-[0_16px_60px_rgba(15,23,42,0.45)] backdrop-blur transition-all duration-300 sm:p-8 md:grid-cols-[auto_1fr] md:items-start">
                    <div className="flex flex-col items-start gap-3 md:sticky md:top-24">
                      <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-100/80">
                        {phase}
                      </div>
                      <div className="text-sm font-medium text-slate-200/80">
                        {item.label}
                      </div>
                    </div>
                    <div
                      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 ${isActive ? `${meta.glow} scale-[1.01] border-white/40` : ""}`}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.background} opacity-90`}
                      />
                      <div className="relative flex flex-col gap-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${meta.badgeClass}`}
                            >
                              {meta.label}
                            </span>
                            <h3 className="text-2xl font-semibold text-slate-900">
                              {item.title}
                            </h3>
                          </div>
                          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-white/70 text-slate-900 shadow-lg shadow-slate-900/10">
                            <Icon className="h-6 w-6" strokeWidth={1.6} />
                          </div>
                        </div>
                        <ul className="space-y-2 text-base font-medium text-slate-900/90">
                          {item.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm shadow-sm shadow-white/40"
                            >
                              <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-slate-700" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                        {isActive && (
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                            এখন ফোকাস চলছে
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {index === SCHEDULE.length - 1 ? null : (
                    <div className="absolute -bottom-3 left-4 hidden h-6 w-[1px] bg-gradient-to-b from-white/20 to-transparent md:block" />
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
