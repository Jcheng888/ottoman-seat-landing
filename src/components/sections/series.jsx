import { Media } from "@/components/ui/media";
import { series } from "@/data/content";

export function SeriesSection({ onOrder }) {
  return (
    <section className="sec" id="series">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">4 Siri · Pilih ikut budget</span>
          <h2 className="sec__title">Setiap budget,<br/>ada <em>jodohnya</em>.</h2>
          <p className="sec__sub">Dari pemula sampai heavy-duty — empat siri untuk lifestyle berbeza. Semua custom-fit, semua warranty.</p>
        </div>
        <div className="series-grid">
          {series.map(s => <SeriesCard key={s.id} s={s} onClick={() => onOrder(s.id)}/>)}
        </div>
      </div>
    </section>
  );
}

function SeriesCard({ s, onClick }) {
  return (
    <div className="series" onClick={onClick}>
      <div className="series__media">
        <span className="series__badge">{s.badge}</span>
        <Media tag="PHOTO" tone={s.tone}
               brief={`${s.name} series hero — single driver seat, studio lighting seamless ${s.tone === 'galaxy' ? 'biru malam' : s.tone}. Macro stitching visible.`}
               dim="800×600"
               style={{ position:'absolute', inset:0, borderRadius:0, border:'none' }}/>
      </div>
      <div className="series__body">
        <div className="series__eyebrow">Siri</div>
        <h3 className="series__name">{s.name}</h3>
        <p className="series__tagline">{s.tagline}</p>
        <div className="series__specs">
          <div className="series__spec">
            <div className="series__spec-num">{s.thickness}</div>
            <div className="series__spec-label">Tebal</div>
          </div>
          <div className="series__spec">
            <div className="series__spec-num">{s.layers}</div>
            <div className="series__spec-label">Lapisan</div>
          </div>
          <div className="series__spec">
            <div className="series__spec-num">{s.warranty}</div>
            <div className="series__spec-label">Warranty</div>
          </div>
        </div>
        <div className="series__foot">
          <div>
            <div className="series__price-label">Dari</div>
            <div className="series__price">{s.price} {s.priceWas && <span style={{textDecoration:'line-through', color:'var(--fg-3)'}}>{s.priceWas}</span>}</div>
          </div>
          <div className="series__arrow">→</div>
        </div>
      </div>
    </div>
  );
}
