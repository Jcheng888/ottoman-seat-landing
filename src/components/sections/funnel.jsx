import { funnelSteps } from "@/data/content";

export function Funnel() {
  return (
    <section className="sec funnel">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Selepas anda tempah</span>
          <h2 className="sec__title">Selepas <em>deposit</em>,<br/>apa jadi?</h2>
          <p className="sec__sub">4 langkah, dari deposit ke kereta siap. Setiap langkah ada designer kami pegang tangan anda.</p>
        </div>
        <div className="funnel__steps">
          {funnelSteps.map((s, i) => (
            <div key={i} className={`fstep ${s.feature ? "fstep--feature" : ""}`}>
              <div className="fstep__num">{s.num}</div>
              <h4 className="fstep__title">{s.title}</h4>
              <p className="fstep__desc">{s.desc}</p>
              <div className="fstep__meta">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
