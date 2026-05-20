// Ottoman seat cover — top sections (Hero, Problem scroll, Solution, Wow gallery)
const { useState, useEffect, useRef } = React;

// ---------------- Promo bar ----------------
function PromoBar() {
  return (
    <div className="promo-bar">
      <span className="promo-bar__dot" />
      <span className="promo-bar__msg">
        Promosi 48 jam · Free Up-to-Door (Klang Valley) · 0% Ansuran Atome
      </span>
    </div>);

}

// ---------------- Header ----------------
function Header({ onOrder }) {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" className="header__logo">
          <img src="assets/logo-ottoman-dark.png" alt="Ottoman" />
        </a>
        <nav className="header__nav">
          <a href="#series">Siri</a>
          <a href="#configurator">Reka</a>
          <a href="#bundle">Bundle</a>
          <a href="#testimoni">Testimoni</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="header__cta" onClick={onOrder}>
          <Icon name="whats" size={14} /> Tempah
        </button>
      </div>
    </header>);

}

// ---------------- Hero (3 layout variants) ----------------
function Hero({ variant = "split", onOrder, onCheck }) {
  if (variant === "full") return <HeroFull onOrder={onOrder} onCheck={onCheck} />;
  if (variant === "gallery") return <HeroGallery onOrder={onOrder} onCheck={onCheck} />;
  return <HeroSplit onOrder={onOrder} onCheck={onCheck} />;
}

function HeroBlurb() {
  return (
    <>
      <div className="hero__eyebrow">Custom · Made in Malaysia · Since 2016</div>
      <h1 className="hero__title">
        Kereta lama,<br />
        rasa <em>baru</em><br />
        balik.
      </h1>
      <p className="hero__body">
        Sarung seat kustom — fit setiap inci kereta anda. Nappa leather grade premium, 5 lapisan pelindung, dipasang dalam 90 minit di rumah anda.
      </p>
    </>);

}

function HeroFeatures({ light }) {
  const items = [
  { ic: "✓", t: "Custom-fit 1,200+ model" },
  { ic: "✓", t: "Pasang ≤ 90 minit" },
  { ic: "✓", t: "Warranty sampai 5 thn" },
  { ic: "✓", t: "27,000+ pemilik puas hati" }];

  return (
    <div className="hero__features">
      {items.map((it, i) =>
      <div className="hero__feature" key={i}>
          <span className="hero__feature-ic">{it.ic}</span>
          <span>{it.t}</span>
        </div>
      )}
    </div>);

}

function HeroSplit({ onOrder, onCheck }) {
  return (
    <section className="hero" id="top">
      <div className="hero__grid hero__grid--split">
        <div className="hero__copy">
          <HeroBlurb />
          <div className="hero__cta-row">
            <button className="btn btn--primary btn--lg" onClick={onOrder}>
              Tempah · Deposit RM 50 <Icon name="arrow" size={14} />
            </button>
            <button className="btn btn--ghost btn--lg" onClick={onCheck}>
              Check kereta saya
            </button>
          </div>
          <HeroFeatures />
        </div>
        <div className="hero__visual">
          <span className="hero__visual-badge"><span className="dot" /> Live · Promosi 48 jam</span>
          <Media tag="VIDEO" tone="leather" icon="▶"
          brief="Hero video looping 8s: kamera slow-pan dari pintu kereta luxury, masuk ke dalam, focus pada seat Ottoman Adamas (cocoa + tan piping, diamond stitch). Lighting dusk, warm tone."
          dim="1080×1350" style={{ position: 'absolute', inset: 0, borderRadius: 0, border: 'none', minHeight: '100%' }} />
        </div>
      </div>
    </section>);

}

function HeroFull({ onOrder, onCheck }) {
  return (
    <section className="hero hero--full" id="top">
      <div className="hero__bleed">
        <div className="hero__bleed-media">
          <Media tag="VIDEO" tone="leather" icon="▶"
          brief="Full-bleed hero: cinematic 12s loop interior kereta luxury malam, lighting dashboard sahaja, focus drift dari steering ke seat Ottoman fully installed. Mood ambient, no people."
          dim="1920×1080" />
        </div>
        <div className="wrap hero__bleed-inner">
          <HeroBlurb />
          <div className="hero__cta-row">
            <button className="btn btn--primary btn--lg" onClick={onOrder}>
              Tempah · Deposit RM 50 <Icon name="arrow" size={14} />
            </button>
            <button className="btn btn--ghost-light btn--lg" onClick={onCheck}>
              Check kereta saya
            </button>
          </div>
          <HeroFeatures light />
        </div>
      </div>
    </section>);

}

function HeroGallery({ onOrder, onCheck }) {
  return (
    <section className="hero hero--gallery" id="top">
      <div className="wrap">
        <HeroBlurb />
        <div className="hero__cta-row">
          <button className="btn btn--primary btn--lg" onClick={onOrder}>
            Tempah · Deposit RM 50 <Icon name="arrow" size={14} />
          </button>
          <button className="btn btn--ghost btn--lg" onClick={onCheck}>
            Check kereta saya
          </button>
        </div>
        <div className="hero__gallery">
          <Media className="g1" tag="VIDEO" tone="leather" icon="▶"
          brief="Hero featured: 8s loop driver POV — masuk kereta, duduk atas seat Ottoman Adamas, drive off. Dusk lighting."
          dim="1200×900" />
          <Media className="g2" tag="PHOTO" tone="cocoa"
          brief="Macro shot diamond stitching, lighting 45°, texture leather grain visible."
          dim="600×600" />
          <Media className="g3" tag="PHOTO" tone="maroon"
          brief="Driver seat solo shot, dramatic side light, maroon + cream theme."
          dim="600×600" />
          <Media className="g4" tag="PHOTO" tone="default"
          brief="Wide interior, 5-seater fully installed, top-down 3/4 angle."
          dim="900×600" />
          <Media className="g5" tag="PHOTO" tone="galaxy"
          brief="Eleven series glitter effect, night shot dengan ambient light."
          dim="900×600" />
        </div>
      </div>
    </section>);

}

// ---------------- Marquee divider strip ----------------
function MarqueeStrip() {
  const tokens = [
  "Custom-Fit Setiap Model", "Free Up-to-Door (Klang Valley)", "0% Ansuran 6 Bulan",
  "Warranty 5 Tahun", "Install ≤ 90 Minit", "Nappa Leather Premium"];

  return (
    <div className="divider-strip">
      <div className="divider-strip__track">
        {[0, 1].map((k) =>
        <span key={k}>
            {tokens.map((t, i) =>
          <React.Fragment key={i}>
                {t}<span className="dot">●</span>
              </React.Fragment>
          )}
          </span>
        )}
      </div>
    </div>);

}

// ---------------- Problem (Taobao-style scroll) ----------------
function Problem() {
  return (
    <section className="sec problem">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Masalah yang anda kenal</span>
          <h2 className="sec__title">Anda <em>tahu</em> rasa<br />frustasi ni.</h2>
          <p className="sec__sub">5 perkara yang setiap pemilik kereta di Malaysia kongsi. Scroll perlahan-lahan.</p>
        </div>
        <div className="problem__stack">
          {OTT.painpoints.map((p, i) =>
          <Painpoint key={p.id} p={p} reverse={i % 2 === 1} />
          )}
        </div>
      </div>
    </section>);

}

function Painpoint({ p, reverse }) {
  return (
    <div className={`painpoint ${reverse ? "painpoint--rev" : ""}`}>
      <Media className="painpoint__media" tag={p.mediaTag} tone={p.mediaTone}
      brief={p.mediaBrief} dim={p.mediaDim} />
      <div>
        <div className="painpoint__num">{p.num}</div>
        <h3 className="painpoint__title" dangerouslySetInnerHTML={{ __html: p.title }} />
        <p className="painpoint__body">{p.body}</p>
        <div className="painpoint__quote">{p.quote}</div>
      </div>
    </div>);

}

// ---------------- Solution (5x layers) ----------------
function Solution() {
  return (
    <section className="sec solution">
      <div className="wrap">
        <div className="sec__head solution__head">
          <span className="sec__eyebrow">Penyelesaian Ottoman</span>
          <h2 className="sec__title solution__title">5 lapisan.<br/><em>Satu seat sempurna.</em></h2>
          <p className="sec__sub">Setiap sarung Ottoman dibina dengan sistem 5x Protective Layers — fabrik kereta asal anda tak dapat tandingi.</p>
        </div>
        <div className="solution__grid">
          <div className="solution__visual">
            <Media tag="PHOTO" tone="peach"
            brief="Exploded view animation/photo: 5 lapisan seat cover dibuka berlapis-lapis. Top down view dengan label arrow ke setiap lapisan. Mood premium, hi-tech."
            dim="1080×1080"
            style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }} />
          </div>
          <div>
            <div className="solution__layers">
              {OTT.layers.map((l) =>
              <div className="layer" key={l.num}>
                  <div className="layer__num">{l.num}</div>
                  <div>
                    <h4 className="layer__title">{l.title}</h4>
                    <p className="layer__desc">{l.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------------- Wow sample gallery ----------------
function WowGallery() {
  const items = [
  { cls: "wow-1", tag: "VIDEO", tone: "leather", brief: "Hero reel: before-after transformation 6s. Kereta sebelum (seat fabric kotor, kusut) → after (Ottoman Adamas installed, cantik). Wipe transition.", dim: "1200×900" },
  { cls: "wow-2", tag: "PHOTO", tone: "maroon", brief: "Honda HR-V interior — maroon + cream theme. Top-down 3/4 angle.", dim: "600×600" },
  { cls: "wow-3", tag: "PHOTO", tone: "galaxy", brief: "Eleven galaxy series, night lighting, glitter visible.", dim: "600×600" },
  { cls: "wow-4", tag: "PHOTO", tone: "cocoa", brief: "Adamas series, diamond stitch macro, 45° lighting.", dim: "900×600" },
  { cls: "wow-5", tag: "VIDEO", tone: "dark", brief: "Installation timelapse 10s — installer wrap seat dari awal sampai siap.", dim: "900×600" },
  { cls: "wow-6", tag: "PHOTO", tone: "default", brief: "Wide group shot 3 series side-by-side dalam showroom Klang. Drone-like angle.", dim: "1600×600" }];

  return (
    <section className="sec sec--cream">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Showroom · Real cars</span>
          <h2 className="sec__title">Lihat sendiri,<br />tak <em>cakap kosong</em>.</h2>
          <p className="sec__sub">Hasil kereta sebenar pelanggan kami — bukan render, bukan stock photo.</p>
        </div>
        <div className="wow__grid">
          {items.map((m, i) =>
          <Media key={i} className={m.cls} tag={m.tag} tone={m.tone} brief={m.brief} dim={m.dim} />
          )}
        </div>
      </div>
    </section>);

}

Object.assign(window, { PromoBar, Header, Hero, MarqueeStrip, Problem, Solution, WowGallery });