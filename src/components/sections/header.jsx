import { Icon } from "@/components/ui/media";

export function Header({ onOrder }) {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" className="header__logo">
          <img src="/assets/logo-ottoman-dark.png" alt="Ottoman" />
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
    </header>
  );
}
