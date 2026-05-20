import { Media } from "@/components/ui/media";
import { branches } from "@/data/content";

export function Branches() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <span className="sec__eyebrow">Showrooms Malaysia</span>
          <h2 className="sec__title">Boleh datang<br/>tengok <em>sendiri</em>.</h2>
          <p className="sec__sub">3 wilayah utama. Walk-in untuk feel material, atau biar kami sampai ke rumah anda.</p>
        </div>
        <div className="branches__grid">
          {branches.map((b, i) => (
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
