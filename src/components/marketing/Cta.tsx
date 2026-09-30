import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function Cta() {
  return (
    <section className="px-4 pb-24">
      <Reveal className="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-primary to-secondary px-6 py-16 text-center text-white shadow-soft">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to find your next client?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-indigo-100">
          Add your first business and see what LeadNexa finds on its website.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 font-medium text-primary transition hover:bg-indigo-50"
        >
          Start for free
        </Link>
      </Reveal>
    </section>
  );
}