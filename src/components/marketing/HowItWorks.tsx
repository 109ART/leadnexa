import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    title: "Add a business",
    text: "Enter the name, website URL, industry and location. CSV import comes later.",
  },
  {
    title: "Run the audit",
    text: "LeadNexa reads the site and lists what it could confirm, plus AI suggestions.",
  },
  {
    title: "Review the opportunities",
    text: "See the lead score, the reasons behind it and the services that may fit.",
  },
  {
    title: "Send your outreach",
    text: "Edit the drafted email, send it yourself and track the reply.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy px-4 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-indigo-300">How it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From a website URL to a ready email in four steps
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="h-full rounded-card border border-white/10 bg-white/5 p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}