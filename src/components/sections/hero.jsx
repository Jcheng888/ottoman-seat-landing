import { Icon, Media } from "@/components/ui/media";
import { images } from "@/data/content";

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
    </>
  );
}

function HeroFeatures({ light }) {
  const items = [
    { ic: "✓", t: "Custom-fit 1,200+ model" },
    { ic: "✓", t: "Pasang ≤ 90 minit" },
    { ic: "✓", t: "Warranty sampai 5 thn" },
    { ic: "✓", t: "27,000+ pemilik puas hati" }
  ];
  return (
    <div className="hero__features">
      {items.map((it, i) =>
        <div className="hero__feature" key={i}>
          <span className="hero__feature-ic">{it.ic}</span>
          <span>{it.t}</span>
        </div>
      )}
    </div>
  );
}

export function Hero({ variant = "split", onOrder, onCheck }) {
  if (variant === "full") return <HeroFull onOrder={onOrder} onCheck={onCheck} />;
  if (variant === "gallery") return <HeroGallery onOrder={onOrder} onCheck={onCheck} />;
  return <HeroSplit onOrder={onOrder} onCheck={onCheck} />;
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
          <Media tag="VIDEO" tone="leather" icon="▶" src={images.heroSplit}
            brief="Hero video looping 8s: kamera slow-pan dari pintu kereta luxury, masuk ke dalam, focus pada seat Ottoman Adamas (cocoa + tan piping, diamond stitch). Lighting dusk, warm tone."
            dim="1080×1350" alt="Ottoman Adamas seat cover installed in luxury car" style={{ position: 'absolute', inset: 0, borderRadius: 0, border: 'none', minHeight: '100%' }} />
        </div>
      </div>
    </section>
  );
}

function HeroFull({ onOrder, onCheck }) {
  return (
    <section className="hero hero--full" id="top">
      <div className="hero__bleed">
        <div className="hero__bleed-media">
          <Media tag="VIDEO" tone="leather" icon="▶" src={images.heroFull}
            brief="Full-bleed hero: cinematic 12s loop interior kereta luxury malam, lighting dashboard sahaja, focus drift dari steering ke seat Ottoman fully installed. Mood ambient, no people."
            dim="1920×1080" alt="Ottoman seat covers installed in luxury car at night" />
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
    </section>
  );
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
    </section>
  );
}
