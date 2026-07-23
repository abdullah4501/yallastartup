"use client";

import { useEffect, useState } from "react";

type CountdownProps = { target: string; label: string };

function getRemaining(target: string) {
  const distance = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    total: distance,
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export default function Countdown({ target, label }: CountdownProps) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    const updateRemaining = () => setRemaining(getRemaining(target));
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 1_000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (remaining?.total === 0) {
    return <p className="countdown-closed">The application deadline has passed. Join the next-cohort list below.</p>;
  }

  const units: ReadonlyArray<readonly [number | string, string]> = [
    [remaining?.days ?? "--", "Days"],
    [remaining?.hours ?? "--", "Hours"],
    [remaining?.minutes ?? "--", "Minutes"],
    [remaining?.seconds ?? "--", "Seconds"],
  ] as const;

  return (
    <div className="countdown" aria-label={`Time remaining until ${label}`} aria-busy={!remaining}>
      {units.map(([value, unit]) => (
        <div className="countdown-unit" key={unit}>
          <strong>{typeof value === "number" ? String(value).padStart(2, "0") : value}</strong>
          <span>{unit}</span>
        </div>
      ))}
    </div>
  );
}
