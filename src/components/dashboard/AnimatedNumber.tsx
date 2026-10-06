"use client";

import { useEffect, useState } from "react";
import { animate } from "motion/react";

export default function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{display}</span>;
}