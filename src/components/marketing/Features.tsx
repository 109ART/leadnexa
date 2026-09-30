import { Search, Gauge, Mail, ListChecks, ShieldCheck, Layers } from "lucide-react";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const features = [
  {
    icon: Search,
    title: "Website audit",
    text: "Checks structure, contact options, calls to action and basic SEO on any business website.",
  },
  {
    icon: ShieldCheck,
    title: "Verified vs AI",
    text: "Facts found on the page are kept separate from AI suggestions, so you always know what is confirmed.",
  },
  {
    icon: Gauge,
    title: "Transparent lead score",
    text: "A simple score that always shows why it was given. It is a guide, not a guarantee.",
  },
  {
    icon: Mail,
    title: "Personalized emails",
    text: "Draft an email based on the audit. Edit, regenerate and copy it before you send.",
  },
  {
    icon: ListChecks,
    title: "Lead tracking",
    text: "Mark leads as contacted or interested and keep follow-ups in one place.",
  },
  {
    icon: Layers,
    title: "Built to grow",
    text: "Made with a modular structure so more providers and features can be added later.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to reach the right clients
          </h2>
          <p className="mt-4 text-muted">
            Less time researching, more time on outreach that actually fits
            each business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Card className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-primary">
                  <f.icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}