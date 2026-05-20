"use client";

import { useState, useMemo, useEffect } from "react";
import { Media, Icon } from "@/components/ui/media";
import { colors, themes } from "@/data/content";

export function Configurator() {
  const [colorId, setColorId] = useState("cocoa");
  const colorMap = useMemo(() => Object.fromEntries(colors.map(c => [c.id, c])), []);
  const c = colorMap[colorId];

  const relatedThemes = useMemo(
    () => themes.filter(t => t.colors.includes(colorId)).slice(0, 4),
    [colorId]
  );
  const themeList = relatedThemes.length ? relatedThemes : themes.slice(0, 3);
  const [activeTheme, setActiveTheme] = useState(themeList[0]?.id);
  useEffect(() => { setActiveTheme(themeList[0]?.id); }, [colorId]);

  const gallery = useMemo(() => [
    { tone: c.tone, brief: `Hero shot · Adamas series fully installed dalam warna ${c.name}. Driver seat solo, 45° angle, dramatic side light. Texture diamond stitch visible.`, dim: "1200×900" },
    { tone: c.tone, brief: `Macro stitching ${c.name} — close-up extreme texture, leather grain visible. Studio lighting.`, dim: "800×800" },
    { tone: c.tone, brief: `Interior wide ${c.name} theme — kereta sedan Malaysian context (Honda City / Vios), 5-seater fully installed.`, dim: "800×800" },
    { tone: c.tone, brief: `Customer in-car shot · pemandu duduk atas seat ${c.name}, smile, casual lifestyle moment.`, dim: "800×800" },
    { tone: c.tone, brief: `Detail piping & corner ${c.name} — show how custom-fit hug the seat shape perfectly.`, dim: "800×800" },
  ], [c]);

  const possibilities = colors.length ** 3;

  return (
    <section className="sec configurator" id="configurator">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Reka sendiri</span>
          <h2 className="sec__title">Pilih warna,<br/>lihat <em>hasilnya</em>.</h2>
          <p className="sec__sub">Tap satu warna — kami tunjuk gallery sebenar bagaimana ia nampak dalam kereta. Plus tema kurasi yang menampilkan warna pilihan anda.</p>
        </div>

        <div className="config__picker" role="radiogroup" aria-label="Pilih warna">
          {colors.map(col => (
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

          <div className="config__sidecol">
            <h3>Tema dengan {c.name}</h3>
            <p className="config__sidecol-sub">{themeList.length} kombinasi yang dipilih tim kami untuk warna ini.</p>
            <div className="config__theme-list">
              {themeList.map(t => (
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
