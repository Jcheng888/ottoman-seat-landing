import { Icon } from "@/components/ui/media";

export function FinalCTA({ onOrder }) {
  return (
    <section className="sec final-cta">
      <div className="wrap final-cta__inner">
        <span className="sec__eyebrow">Langkah seterusnya</span>
        <h2 className="sec__title final-cta__title" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Reserve slot anda<br/>untuk <em>RM 50</em>.
        </h2>
        <p className="sec__sub final-cta__sub" style={{ margin: '20px auto 0', maxWidth: 540 }}>
          Refundable. Lock-in harga promosi. Designer kami WhatsApp anda dalam 24 jam untuk pilih tema warna.
        </p>
        <div className="final-cta__row">
          <button className="btn btn--primary btn--xl" onClick={onOrder}>
            Tempah · RM 50 deposit <Icon name="arrow" size={14}/>
          </button>
          <a href="https://wa.me/60123456789" target="_blank" rel="noreferrer" className="btn btn--ghost-light btn--xl">
            <Icon name="whats" size={14}/> WhatsApp Designer
          </a>
        </div>
      </div>
    </section>
  );
}
