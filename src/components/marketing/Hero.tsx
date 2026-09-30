"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import AuditPreview from "./AuditPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-36 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(79,70,229,0.15),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl"
      >
        <Badge>AI website opportunity detection</Badge>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Find clients who need a better website,{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            before you pitch
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Paste a business website. LeadNexa audits it, spots real
          opportunities, and helps you write a personalized email you can
          review and send yourself.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-white shadow-soft transition hover:bg-indigo-700"
          >
            Start for free <ArrowRight size={18} />
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-full border border-border bg-surface px-7 py-3.5 font-medium transition hover:bg-slate-50"
          >
            See how it works
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-16 max-w-3xl"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <AuditPreview />
        </motion.div>
      </motion.div>
    </section>
  );
}