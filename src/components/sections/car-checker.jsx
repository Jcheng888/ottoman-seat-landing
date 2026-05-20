"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/media";
import { cars } from "@/data/content";

export function CarChecker({ onOrder }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brand ? cars[brand] : [];

  return (
    <section className="sec checker" id="check">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Check Kereta Anda</span>
          <h2 className="sec__title checker__title">Model anda<br/><em>ada tak?</em></h2>
          <p className="sec__sub" style={{ color: 'var(--fg-dark-2)' }}>1,200+ pattern tersedia. Pilih jenama dan model — lihat harga & confirm dalam masa real-time.</p>
        </div>

        <div className="checker__form">
          <div className="checker__field">
            <label className="checker__label">Jenama Kereta</label>
            <select className="checker__select" value={brand} onChange={e => { setBrand(e.target.value); setModel(""); }}>
              <option value="">— Pilih jenama —</option>
              {Object.keys(cars).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="checker__field">
            <label className="checker__label">Model & Tahun</label>
            <select className="checker__select" value={model} onChange={e => setModel(e.target.value)} disabled={!brand}>
              <option value="">{brand ? "— Pilih model —" : "Pilih jenama dulu"}</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {model && (
            <div className="checker__result">
              <span className="checker__result-tick">
                <Icon name="check" size={12} stroke={3}/> Ya, kami ada
              </span>
              <h4 className="checker__result-model">{brand} {model}</h4>
              <div className="checker__result-meta">Custom-fit pattern siap · Compatible dengan semua 4 siri · Pasang 90 minit</div>
              <div className="checker__result-row">
                <div>
                  <div style={{ font: '700 10px/1 var(--font-sans)', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7 }}>Dari (Origin)</div>
                  <div className="checker__result-price">RM 1,088 <small>onwards</small></div>
                </div>
                <button className="btn btn--dark btn--lg" onClick={() => onOrder("origin")}>
                  Tempah Sekarang <Icon name="arrow" size={14}/>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
