import React from "react";

export function MarqueeStrip() {
  const tokens = [
    "Custom-Fit Setiap Model", "Free Up-to-Door (Klang Valley)", "0% Ansuran 6 Bulan",
    "Warranty 5 Tahun", "Install ≤ 90 Minit", "Nappa Leather Premium"
  ];
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
    </div>
  );
}
