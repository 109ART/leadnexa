import Link from "next/link";
import { Check } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";

const included = [
  "Website audits for your leads",
  "Lead scoring with reasons",
  "AI-drafted outreach emails",
  "Lead and follow-up tracking",
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-24">
      <Reveal className="mx-auto max-w-md">
        <Card className="text-center">
          <Badge>Early access</Badge>
          <h2 className="mt-4 text-3xl font-bold">Free while in beta</h2>
          <p className="mt-2 text-sm text-muted">
            Paid plans will come later. Early users will hear about them first.
          </p>
          <ul className="mt-6 space-y-3 text-left text-sm">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} className="text-success" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="mt-8 block rounded-full bg-primary px-6 py-3 text-center font-medium text-white shadow-soft transition hover:bg-indigo-700"
          >
            Get started
          </Link>
        </Card>
      </Reveal>
    </section>
  );
}