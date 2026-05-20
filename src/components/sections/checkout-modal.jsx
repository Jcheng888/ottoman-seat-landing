"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/media";
import { series } from "@/data/content";

export function CheckoutModal({ open, series: seriesId, onClose }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", phone: "", email: "", car: "" });
  useEffect(() => { if (open) setStep("form"); }, [open]);
  if (!open) return null;
  const s = series.find(x => x.id === seriesId) || series[1];

  const submit = async (e) => {
    e.preventDefault();
    setStep("paying");
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, series: s.name }),
      });
    } catch (_) {
      // Proceed even if API call fails
    }
    setTimeout(() => setStep("done"), 1400);
  };

  return (
    <div className="modal-bg" onClick={(e) => e.target.classList.contains("modal-bg") && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>×</button>
        {step === "form" && (
          <>
            <h2>Reserve Slot</h2>
            <p className="modal__sub">Deposit RM 50 (refundable). Designer kami akan WhatsApp anda dalam 24 jam.</p>
            <div className="modal__summary">
              <div className="modal__summary-row"><span>Siri</span><b>{s.name}</b></div>
              <div className="modal__summary-row"><span>Bundle perks</span><b>6 free items</b></div>
              <div className="modal__summary-row"><span>Anggaran harga</span><span>{s.price}</span></div>
              <div className="modal__summary-row modal__summary-row--total"><span>Deposit hari ini</span><b style={{ color: 'var(--accent-hover)' }}>RM 50</b></div>
            </div>
            <form onSubmit={submit}>
              <div className="modal__field">
                <label>Nama Penuh</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Mohd Aiman"/>
              </div>
              <div className="modal__field">
                <label>No. Phone (WhatsApp)</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="012-345 6789"/>
              </div>
              <div className="modal__field">
                <label>Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="aiman@email.com"/>
              </div>
              <div className="modal__field">
                <label>Kereta Anda</label>
                <input required value={form.car} onChange={e => setForm({...form, car: e.target.value})} placeholder="Honda City 2023"/>
              </div>
              <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: 8 }}>
                Bayar RM 50 deposit <Icon name="arrow" size={14}/>
              </button>
              <p style={{ font: '500 11px/1.4 var(--font-sans)', color: 'var(--fg-3)', textAlign: 'center', marginTop: 12 }}>
                Selepas bayar, anda akan diiringi ke WhatsApp designer kami.
              </p>
            </form>
          </>
        )}
        {step === "paying" && (
          <div className="modal__success">
            <div className="modal__success-ic" style={{ animation: 'pulse 1s infinite' }}>...</div>
            <h2>Memproses bayaran</h2>
            <p className="modal__sub">Sila tunggu, jangan refresh.</p>
          </div>
        )}
        {step === "done" && (
          <div className="modal__success">
            <div className="modal__success-ic">✓</div>
            <h2>Slot anda direserve!</h2>
            <p className="modal__sub">Designer kami WhatsApp anda dalam 24 jam untuk pilih tema warna. Resit dihantar ke email.</p>
            <button className="btn btn--dark btn--block btn--lg" onClick={onClose}>Tutup</button>
          </div>
        )}
      </div>
    </div>
  );
}
