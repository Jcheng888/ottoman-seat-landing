"use client";

import { useState } from "react";
import { faqs } from "@/data/content";

export function FAQ() {
  const [open, setOpen] = useState(-1);
  return (
    <section className="sec sec--cream" id="faq">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Soalan Lazim</span>
          <h2 className="sec__title">Soalan yang<br/>anda <em>ingin tanya</em>.</h2>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__a">
                <div className="faq-item__a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
