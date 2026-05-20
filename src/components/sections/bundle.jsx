import { perks } from "@/data/content";

export function Bundle() {
  return (
    <section className="sec bundle" id="bundle">
      <div className="wrap">
        <div className="sec__head bundle__head">
          <span className="sec__eyebrow">Promosi Eksklusif 48 Jam</span>
          <h2 className="sec__title bundle__title">Bundle yang<br/><em>tak masuk akal</em>.</h2>
          <p className="sec__sub" style={{ color: 'var(--fg-dark-2)' }}>
            6 perks total worth RM 1,189+ — hanya untuk yang order dalam tempoh promosi.
          </p>
        </div>
        <div className="bundle__perks">
          {perks.map((p, i) => (
            <div key={i} className={`perk ${p.feature ? "perk--feature" : ""}`}>
              <div className="perk__ic">{p.ic}</div>
              <div>
                <h4 className="perk__title">{p.title}</h4>
                <p className="perk__desc">{p.desc}</p>
              </div>
              <div className="perk__value">{p.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
