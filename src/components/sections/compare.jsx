export function Compare() {
  const rows = [
    { label: "Harga",       ott: { big: "Dari RM 1,088", sub: "Atome 0% 6 bulan" }, ups: { big: "RM 3,500 – 5,000", sub: "Lump-sum, no instalment" } },
    { label: "Masa siap",   ott: { big: "90 minit", sub: "On-site di rumah" }, ups: { big: "2 – 3 hari", sub: "Kereta ditinggal di shop" } },
    { label: "Custom fit",  ott: "✓", ups: "✗" },
    { label: "Boleh tukar warna kemudian", ott: "✓", ups: "✗" },
    { label: "Warranty",    ott: { big: "1 – 5 tahun", sub: "Cover defect" }, ups: { big: "6 bulan", sub: "Cover defect sahaja" } },
    { label: "Pakar buka & pasang semula", ott: "✓", ups: "✗" }
  ];
  return (
    <section className="sec sec--cream">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Banding satu sama satu</span>
          <h2 className="sec__title">Kenapa <em>tak</em><br/>upholstery shop?</h2>
          <p className="sec__sub">Hitung balik — Ottoman seat cover berbaloi 3x lebih murah dan 30x lebih cepat dari upholstery konvensional.</p>
        </div>
        <div className="compare__table">
          <div className="compare__head">
            <div className="compare__cell compare__cell--head">&nbsp;</div>
            <div className="compare__cell compare__cell--head ott">Ottoman</div>
            <div className="compare__cell compare__cell--head">Upholstery Shop</div>
          </div>
          {rows.map((r, i) => (
            <div className="compare__row" key={i}>
              <div className="compare__cell compare__cell--row">{r.label}</div>
              <div className="compare__cell compare__cell--big">
                {typeof r.ott === "string"
                  ? <span className="compare__check">✓</span>
                  : <>{r.ott.big}<small>{r.ott.sub}</small></>}
              </div>
              <div className="compare__cell compare__cell--big">
                {typeof r.ups === "string"
                  ? <span className="compare__cross">✗</span>
                  : <>{r.ups.big}<small>{r.ups.sub}</small></>}
              </div>
            </div>
          ))}
          <div className="compare__win">
            <b>Save up to RM 3,400 + 2 hari kerja</b>
            <span>vs upholstery konvensional</span>
          </div>
        </div>
      </div>
    </section>
  );
}
