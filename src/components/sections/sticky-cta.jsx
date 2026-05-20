"use client";

import { useState, useEffect } from "react";

export function StickyCTA({ onOrder }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handle = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handle, { passive: true });
    document.body.classList.add("has-sticky");
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <div className={`sticky-cta ${show ? "show" : ""}`}>
      <div className="sticky-cta__price">
        <div className="sticky-cta__price-was">RM 1,888</div>
        <div className="sticky-cta__price-now">RM 1,488 <span>onwards</span></div>
      </div>
      <button className="sticky-cta__cta" onClick={onOrder}>Tempah RM 50</button>
    </div>
  );
}
