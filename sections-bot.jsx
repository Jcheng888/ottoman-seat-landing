// Ottoman seat cover — bottom sections (Bundle, Countdown, Funnel, Testimonials, Branches, FAQ, Footer)
const { useState: useS3, useEffect: useE3, useRef: useR3 } = React;

// ---------------- Bundle perks ----------------
function Bundle() {
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
          {OTT.perks.map((p, i) => (
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

// ---------------- Countdown ----------------
function Countdown({ onOrder }) {
  const STORAGE_KEY = "ott-cd-deadline";
  const [now, setNow] = useS3(Date.now());
  const deadline = useR3(null);

  useE3(() => {
    let d = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!d || d < Date.now()) {
      d = Date.now() + 48 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(d));
    }
    deadline.current = d;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, (deadline.current || 0) - now);
  const hh = Math.floor(remaining / 3600000);
  const mm = Math.floor((remaining % 3600000) / 60000);
  const ss = Math.floor((remaining % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="countdown">
      <div className="wrap">
        <div className="countdown__eyebrow">
          <span className="dot"/> Promosi habis dalam
        </div>
        <h2 className="countdown__title">Bundle <em>diskaun 15%</em><br/>+ free up-to-door.</h2>
        <div className="countdown__clock">
          <div className="countdown__cell">
            <div className="countdown__num">{pad(hh)}</div>
            <div className="countdown__lbl">Jam</div>
          </div>
          <div className="countdown__cell">
            <div className="countdown__num">{pad(mm)}</div>
            <div className="countdown__lbl">Minit</div>
          </div>
          <div className="countdown__cell">
            <div className="countdown__num">{pad(ss)}</div>
            <div className="countdown__lbl">Saat</div>
          </div>
        </div>
        <button className="btn btn--dark btn--xl" onClick={onOrder}>
          Tempah sekarang · Deposit RM 50 <Icon name="arrow" size={14}/>
        </button>
        <p style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--ott-black)', opacity: 0.7, marginTop: 14 }}>
          ✓ Refundable kalau berubah hati &nbsp;·&nbsp; ✓ Lock-in harga semasa &nbsp;·&nbsp; ✓ Slot priority install
        </p>
      </div>
    </section>
  );
}

// ---------------- Funnel / What to expect ----------------
function Funnel() {
  return (
    <section className="sec funnel">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Selepas anda tempah</span>
          <h2 className="sec__title">Selepas <em>deposit</em>,<br/>apa jadi?</h2>
          <p className="sec__sub">4 langkah, dari deposit ke kereta siap. Setiap langkah ada designer kami pegang tangan anda.</p>
        </div>
        <div className="funnel__steps">
          {OTT.funnelSteps.map((s, i) => (
            <div key={i} className={`fstep ${s.feature ? "fstep--feature" : ""}`}>
              <div className="fstep__num">{s.num}</div>
              <h4 className="fstep__title">{s.title}</h4>
              <p className="fstep__desc">{s.desc}</p>
              <div className="fstep__meta">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- Testimonials ----------------
function Testimonials() {
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
          {OTT.testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <Media tag="PHOTO" tone={t.mediaTone}
                     brief={`Customer photo: ${t.name} dengan kereta ${t.car}. Pose santai, smile, dalam/luar kereta. Authentic, bukan stock photo.`}
                     dim="600×450"
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

// ---------------- Branches ----------------
function Branches() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Showrooms Malaysia</span>
          <h2 className="sec__title">Boleh datang<br/>tengok <em>sendiri</em>.</h2>
          <p className="sec__sub">3 wilayah utama. Walk-in untuk feel material, atau biar kami sampai ke rumah anda.</p>
        </div>
        <div className="branches__grid">
          {OTT.branches.map((b, i) => (
            <div className="branch" key={i}>
              <Media tag="PHOTO" tone={i === 1 ? "leather" : i === 0 ? "default" : "cocoa"}
                     brief={`Exterior shop Ottoman ${b.city} — signboard logo visible, kereta parking depan, daylight golden hour.`}
                     dim="900×540"
                     style={{ position:'relative', width:'100%', height:'auto', borderRadius:0, border:'none' }}
                     className="branch__media"/>
              <div className="branch__body">
                <div className="branch__region">{b.region}</div>
                <h3 className="branch__city">{b.city}</h3>
                <p className="branch__addr">{b.addr}</p>
                <div className="branch__stats">
                  <div className="branch__stat"><b>{b.dealers}</b>Dealer</div>
                  <div className="branch__stat"><b>{b.install}</b>Operasi</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- FAQ ----------------
function FAQ() {
  const [open, setOpen] = useS3(0);
  return (
    <section className="sec sec--cream" id="faq">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Soalan Lazim</span>
          <h2 className="sec__title">Soalan yang<br/>anda <em>ingin tanya</em>.</h2>
        </div>
        <div className="faq__list">
          {OTT.faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__a">
                <div className="faq-item__a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- Final CTA ----------------
function FinalCTA({ onOrder }) {
  return (
    <section className="sec final-cta">
      <div className="wrap final-cta__inner">
        <span className="sec__eyebrow">Langkah seterusnya</span>
        <h2 className="sec__title final-cta__title" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
          Reserve slot anda<br/>untuk <em>RM 50</em>.
        </h2>
        <p className="sec__sub final-cta__sub" style={{ margin: '20px auto 0', maxWidth: 540 }}>
          Refundable. Lock-in harga promosi. Designer kami WhatsApp anda dalam 24 jam untuk pilih tema warna.
        </p>
        <div className="final-cta__row">
          <button className="btn btn--primary btn--xl" onClick={onOrder}>
            Tempah · RM 50 deposit <Icon name="arrow" size={14}/>
          </button>
          <a href="https://wa.me/60123456789" target="_blank" rel="noreferrer" className="btn btn--ghost-light btn--xl">
            <Icon name="whats" size={14}/> WhatsApp Designer
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------- Footer ----------------
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="assets/logo-ottoman.png" alt="Ottoman"/>
            <p>Custom seat cover & car mat, dibuat di Malaysia. Since 2016 · 27,000+ pemilik puas hati.</p>
          </div>
          <div className="footer__col">
            <h5>Produk</h5>
            <ul>
              <li><a href="#series">Origin Series</a></li>
              <li><a href="#series">Adamas Series</a></li>
              <li><a href="#series">Eleven Series</a></li>
              <li><a href="#series">Titan Series</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Syarikat</h5>
            <ul>
              <li><a href="#">Pasal Ottoman</a></li>
              <li><a href="#">Dealer Jaringan</a></li>
              <li><a href="#testimoni">Testimoni</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Hubungi</h5>
            <ul>
              <li><a href="https://wa.me/60123456789">+60 12-345 6789</a></li>
              <li><a href="mailto:hi@ottomanmalaysia.com">hi@ottomanmalaysia.com</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>© 2026 Ottoman Marketing Sdn. Bhd. All rights reserved.</div>
          <div>Bandar Botanik, Klang, Selangor.</div>
        </div>
      </div>
    </footer>
  );
}

// ---------------- Sticky CTA (mobile) ----------------
function StickyCTA({ onOrder }) {
  const [show, setShow] = useS3(false);
  useE3(() => {
    const handle = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handle, { passive: true });
    document.body.classList.add("has-sticky");
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <div className={`sticky-cta ${show ? "show" : ""}`}>
      <div className="sticky-cta__price">
        <div className="sticky-cta__price-was">RM 1,888</div>
        <div className="sticky-cta__price-now">RM 1,488 <span>onwards</span></div>
      </div>
      <button className="sticky-cta__cta" onClick={onOrder}>Tempah RM 50</button>
    </div>
  );
}

// ---------------- Checkout modal ----------------
function CheckoutModal({ open, series, onClose }) {
  const [step, setStep] = useS3("form");
  const [form, setForm] = useS3({ name: "", phone: "", email: "", car: "" });
  useE3(() => { if (open) setStep("form"); }, [open]);
  if (!open) return null;
  const s = OTT.series.find(x => x.id === series) || OTT.series[1];

  const submit = (e) => {
    e.preventDefault();
    setStep("paying");
    setTimeout(() => setStep("done"), 1400);
  };

  return (
    <div className="modal-bg" onClick={(e) => e.target.classList.contains("modal-bg") && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>×</button>
        {step === "form" && (
          <>
            <h2>Reserve Slot</h2>
            <p className="modal__sub">Deposit RM 50 (refundable). Designer kami akan WhatsApp anda dalam 24 jam.</p>
            <div className="modal__summary">
              <div className="modal__summary-row"><span>Siri</span><b>{s.name}</b></div>
              <div className="modal__summary-row"><span>Bundle perks</span><b>6 free items</b></div>
              <div className="modal__summary-row"><span>Anggaran harga</span><span>{s.price}</span></div>
              <div className="modal__summary-row modal__summary-row--total"><span>Deposit hari ini</span><b style={{ color: 'var(--accent-hover)' }}>RM 50</b></div>
            </div>
            <form onSubmit={submit}>
              <div className="modal__field">
                <label>Nama Penuh</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Mohd Aiman"/>
              </div>
              <div className="modal__field">
                <label>No. Phone (WhatsApp)</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="012-345 6789"/>
              </div>
              <div className="modal__field">
                <label>Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="aiman@email.com"/>
              </div>
              <div className="modal__field">
                <label>Kereta Anda</label>
                <input required value={form.car} onChange={e => setForm({...form, car: e.target.value})} placeholder="Honda City 2023"/>
              </div>
              <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: 8 }}>
                Bayar RM 50 deposit <Icon name="arrow" size={14}/>
              </button>
              <p style={{ font: '500 11px/1.4 var(--font-sans)', color: 'var(--fg-3)', textAlign: 'center', marginTop: 12 }}>
                Selepas bayar, anda akan diiringi ke WhatsApp designer kami.
              </p>
            </form>
          </>
        )}
        {step === "paying" && (
          <div className="modal__success">
            <div className="modal__success-ic" style={{ animation: 'pulse 1s infinite' }}>...</div>
            <h2>Memproses bayaran</h2>
            <p className="modal__sub">Sila tunggu, jangan refresh.</p>
          </div>
        )}
        {step === "done" && (
          <div className="modal__success">
            <div className="modal__success-ic">✓</div>
            <h2>Slot anda direserve!</h2>
            <p className="modal__sub">Designer kami WhatsApp anda dalam 24 jam untuk pilih tema warna. Resit dihantar ke email.</p>
            <button className="btn btn--dark btn--block btn--lg" onClick={onClose}>Tutup</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Bundle, Countdown, Funnel, Testimonials, Branches, FAQ, FinalCTA, Footer, StickyCTA, CheckoutModal });
