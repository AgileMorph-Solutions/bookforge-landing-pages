"use client";

import { useEffect, useState } from "react";

interface CountdownBannerProps {
  label: string;
  prefix: string;
}

export function CountdownBanner({ label, prefix }: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tick = () => {
      const diff = endOfDay.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-red text-cream text-center text-xs md:text-sm py-2 px-4 relative">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/textures/parchment-noise.svg)",
          backgroundSize: "100px",
        }}
        aria-hidden
      />
      <span className="relative font-display font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="relative mx-2 opacity-60" aria-hidden>
        ★
      </span>
      <span className="relative">{prefix} </span>
      <span className="relative font-mono font-bold text-gold-light">
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    </div>
  );
}
