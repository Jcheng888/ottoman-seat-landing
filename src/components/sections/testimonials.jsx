import { Media } from "@/components/ui/media";
import { testimonials, images } from "@/data/content";

export function Testimonials() {
  return (
    <section className="sec testi" id="testimoni">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">10 daripada 27,000+</span>
          <h2 className="sec__title">Bukan kami<br/>cakap, <em>mereka</em>.</h2>
          <p className="sec__sub">Real customers, real cars, real reviews. Swipe untuk baca lebih.</p>
        </div>
      </div>
      <div className="wrap">
        <div className="testi__rail">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <Media tag="PHOTO" tone={t.mediaTone} src={images.testimonial}
                     brief={`Customer photo: ${t.name} dengan kereta ${t.car}. Pose santai, smile, dalam/luar kereta. Authentic, bukan stock photo.`}
                     dim="600×450" alt={`${t.name} with ${t.car}`}
                     style={{ position:'relative', width:'100%', height:'auto', borderRadius:0, border:'none' }}
                     className="testi-card__media"/>
              <div className="testi-card__body">
                <div className="testi-card__stars">★★★★★</div>
                <p className="testi-card__quote">“{t.quote}”</p>
                <div className="testi-card__author">
                  <div className="testi-card__avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="testi-card__author-name">{t.name}</div>
                    <div className="testi-card__author-car">{t.car}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
