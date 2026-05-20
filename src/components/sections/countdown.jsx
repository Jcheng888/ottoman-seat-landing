"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/media";

export function Countdown({ onOrder }) {
  const STORAGE_KEY = "ott-cd-deadline";
  const [now, setNow] = useState(Date.now());
  const deadline = useRef(null);

  useEffect(() => {
    let d = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!d || d < Date.now()) {
      d = Date.now() + 48 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(d));
    }
    deadline.current = d;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, (deadline.current || 0) - now);
  const hh = Math.floor(remaining / 3600000);
  const mm = Math.floor((remaining % 3600000) / 60000);
  const ss = Math.floor((remaining % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="countdown">
      <div className="wrap">
        <div className="countdown__eyebrow">
          <span className="dot"/> Promosi habis dalam
        </div>
        <h2 className="countdown__title">Bundle <em>diskaun 15%</em><br/>+ free up-to-door.</h2>
        <div className="countdown__clock">
          <div className="countdown__cell">
            <div className="countdown__num">{pad(hh)}</div>
            <div className="countdown__lbl">Jam</div>
          </div>
          <div className="countdown__cell">
            <div className="countdown__num">{pad(mm)}</div>
            <div className="countdown__lbl">Minit</div>
          </div>
          <div className="countdown__cell">
            <div className="countdown__num">{pad(ss)}</div>
            <div className="countdown__lbl">Saat</div>
          </div>
        </div>
        <button className="btn btn--dark btn--xl" onClick={onOrder}>
          Tempah sekarang · Deposit RM 50 <Icon name="arrow" size={14}/>
        </button>
        <p style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--ott-black)', opacity: 0.7, marginTop: 14 }}>
          ✓ Refundable kalau berubah hati &nbsp;·&nbsp; ✓ Lock-in harga semasa &nbsp;·&nbsp; ✓ Slot priority install
        </p>
      </div>
    </section>
  );
}
