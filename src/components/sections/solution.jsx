import { Media } from "@/components/ui/media";
import { layers } from "@/data/content";

export function Solution() {
  return (
    <section className="sec solution">
      <div className="wrap">
        <div className="sec__head solution__head">
          <span className="sec__eyebrow">Penyelesaian Ottoman</span>
          <h2 className="sec__title">5 lapisan.<br/><em>Satu seat sempurna.</em></h2>
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
              {layers.map((l) =>
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
    </section>
  );
}
