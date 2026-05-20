import { Media } from "@/components/ui/media";
import { painpoints } from "@/data/content";

export function Problem() {
  return (
    <section className="sec problem">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Masalah yang anda kenal</span>
          <h2 className="sec__title">Anda <em>tahu</em> rasa<br />frustasi ni.</h2>
          <p className="sec__sub">5 perkara yang setiap pemilik kereta di Malaysia kongsi. Scroll perlahan-lahan.</p>
        </div>
        <div className="problem__stack">
          {painpoints.map((p, i) =>
            <Painpoint key={p.id} p={p} reverse={i % 2 === 1} />
          )}
        </div>
      </div>
    </section>
  );
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
    </div>
  );
}
