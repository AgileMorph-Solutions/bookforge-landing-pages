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
    <div className="relative z-50 bg-red px-4 py-2 text-center font-body text-[12px] font-semibold uppercase tracking-widest text-white">
      <span>{label}</span>
      <span className="mx-2" aria-hidden>
        ★
      </span>
      <span>
        {prefix}{" "}
        <span className="font-bold">
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </span>
    </div>
  );
}
