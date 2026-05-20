// Ottoman seat cover — middle sections (Series, Configurator, Car checker, Compare)
const { useState: useS2, useMemo, useEffect: useE2 } = React;

// ---------------- Series selection ----------------
function SeriesSection({ onOrder }) {
  return (
    <section className="sec" id="series">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">4 Siri · Pilih ikut budget</span>
          <h2 className="sec__title">Setiap budget,<br/>ada <em>jodohnya</em>.</h2>
          <p className="sec__sub">Dari pemula sampai heavy-duty — empat siri untuk lifestyle berbeza. Semua custom-fit, semua warranty.</p>
        </div>
        <div className="series-grid">
          {OTT.series.map(s => <SeriesCard key={s.id} s={s} onClick={() => onOrder(s.id)}/>)}
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
               src={OTT.images?.series?.[s.id] || undefined}
               alt={`${s.name} series seat cover`}
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

// ---------------- Configurator (color → gallery) ----------------
function Configurator() {
  const [colorId, setColorId] = useS2("cocoa");
  const colorMap = useMemo(() => Object.fromEntries(OTT.colors.map(c => [c.id, c])), []);
  const c = colorMap[colorId];

  // Themes that feature this color
  const relatedThemes = useMemo(
    () => OTT.themes.filter(t => t.colors.includes(colorId)).slice(0, 4),
    [colorId]
  );
  // Fallback: if a color has no themes, just show the first 3
  const themes = relatedThemes.length ? relatedThemes : OTT.themes.slice(0, 3);

  const [activeTheme, setActiveTheme] = useS2(themes[0]?.id);
  useE2(() => { setActiveTheme(themes[0]?.id); }, [colorId]);

  const possibilities = OTT.colors.length ** 3;

  // Build gallery briefs based on the selected color
  const gallery = useMemo(() => [
    { tone: c.tone, brief: `Hero shot · Adamas series fully installed dalam warna ${c.name}. Driver seat solo, 45° angle, dramatic side light. Texture diamond stitch visible.`, dim: "1200×900" },
    { tone: c.tone, brief: `Macro stitching ${c.name} — close-up extreme texture, leather grain visible. Studio lighting.`, dim: "800×800" },
    { tone: c.tone, brief: `Interior wide ${c.name} theme — kereta sedan Malaysian context (Honda City / Vios), 5-seater fully installed.`, dim: "800×800" },
    { tone: c.tone, brief: `Customer in-car shot · pemandu duduk atas seat ${c.name}, smile, casual lifestyle moment.`, dim: "800×800" },
    { tone: c.tone, brief: `Detail piping & corner ${c.name} — show how custom-fit hug the seat shape perfectly.`, dim: "800×800" },
  ], [c]);

  return (
    <section className="sec configurator" id="configurator">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Reka sendiri</span>
          <h2 className="sec__title">Pilih warna,<br/>lihat <em>hasilnya</em>.</h2>
          <p className="sec__sub">Tap satu warna — kami tunjuk gallery sebenar bagaimana ia nampak dalam kereta. Plus tema kurasi yang menampilkan warna pilihan anda.</p>
        </div>

        {/* Horizontal color picker */}
        <div className="config__picker" role="radiogroup" aria-label="Pilih warna">
          {OTT.colors.map(col => (
            <button key={col.id}
                    role="radio"
                    aria-checked={colorId === col.id}
                    className={`config__chip ${colorId === col.id ? "active" : ""}`}
                    onClick={() => setColorId(col.id)}>
              <span className="config__chip-swatch" style={{ background: col.hex }}/>
              <span className="config__chip-name">{col.name}</span>
            </button>
          ))}
        </div>

        <div className="config__display">
          {/* LEFT: Hero image of selected color in real car */}
          <div className="config__hero" key={colorId}>
            <div className="config__hero-name">
              <span className="dot" style={{ background: c.hex }}/>
              {c.name}
            </div>
            <Media className="config__hero-media"
                   tag="PHOTO" tone={c.tone}
                   brief={gallery[0].brief}
                   dim={gallery[0].dim}
                   style={{ position:'relative', width:'100%', height:'auto', border:'none' }}/>
          </div>

          {/* RIGHT: Curated themes featuring this color */}
          <div className="config__sidecol">
            <h3>Tema dengan {c.name}</h3>
            <p className="config__sidecol-sub">{themes.length} kombinasi yang dipilih tim kami untuk warna ini.</p>
            <div className="config__theme-list">
              {themes.map(t => (
                <button key={t.id}
                        className={`config__theme ${activeTheme === t.id ? "active" : ""}`}
                        onClick={() => setActiveTheme(t.id)}>
                  <span className="config__theme-dots">
                    {t.colors.map((id, i) => (
                      <span key={i} style={{ background: colorMap[id].hex }}/>
                    ))}
                  </span>
                  <div>
                    <div className="config__theme-name">{t.name}</div>
                    <div className="config__theme-tagline">{t.tagline}</div>
                  </div>
                  <span className="config__theme-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Smaller gallery: more contexts in this color */}
        <div className="config__gallery">
          {gallery.slice(1).map((g, i) => (
            <Media key={`${colorId}-${i}`} tag="PHOTO" tone={g.tone} brief={g.brief} dim={g.dim}/>
          ))}
        </div>

        <div className="config__possibilities">
          <b>{possibilities.toLocaleString()}+</b>
          <span>Kombinasi · Tiada dua kereta yang sama</span>
        </div>
      </div>
    </section>
  );
}

// ---------------- Car checker ----------------
function CarChecker({ onOrder }) {
  const [brand, setBrand] = useS2("");
  const [model, setModel] = useS2("");
  const models = brand ? OTT.cars[brand] : [];

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
              {Object.keys(OTT.cars).map(b => <option key={b} value={b}>{b}</option>)}
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

// ---------------- Compare (vs upholstery) ----------------
function Compare() {
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

Object.assign(window, { SeriesSection, Configurator, CarChecker, Compare });
