import { Media } from "@/components/ui/media";

export function WowGallery() {
  const items = [
    { cls: "wow-1", tag: "VIDEO", tone: "leather", brief: "Hero reel: before-after transformation 6s. Kereta sebelum (seat fabric kotor, kusut) → after (Ottoman Adamas installed, cantik). Wipe transition.", dim: "1200×900" },
    { cls: "wow-2", tag: "PHOTO", tone: "maroon", brief: "Honda HR-V interior — maroon + cream theme. Top-down 3/4 angle.", dim: "600×600" },
    { cls: "wow-3", tag: "PHOTO", tone: "galaxy", brief: "Eleven galaxy series, night lighting, glitter visible.", dim: "600×600" },
    { cls: "wow-4", tag: "PHOTO", tone: "cocoa", brief: "Adamas series, diamond stitch macro, 45° lighting.", dim: "900×600" },
    { cls: "wow-5", tag: "VIDEO", tone: "dark", brief: "Installation timelapse 10s — installer wrap seat dari awal sampai siap.", dim: "900×600" },
    { cls: "wow-6", tag: "PHOTO", tone: "default", brief: "Wide group shot 3 series side-by-side dalam showroom Klang. Drone-like angle.", dim: "1600×600" }
  ];
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
    </section>
  );
}
