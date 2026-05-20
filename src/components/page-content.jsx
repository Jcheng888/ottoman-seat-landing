"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { WowGallery } from "@/components/sections/wow-gallery";
import { SeriesSection } from "@/components/sections/series";
import { Compare } from "@/components/sections/compare";
import { Bundle } from "@/components/sections/bundle";
import { Funnel } from "@/components/sections/funnel";
import { Testimonials } from "@/components/sections/testimonials";
import { Branches } from "@/components/sections/branches";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Configurator } from "@/components/sections/configurator";
import { CarChecker } from "@/components/sections/car-checker";
import { Countdown } from "@/components/sections/countdown";
import { FAQ } from "@/components/sections/faq";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { CheckoutModal } from "@/components/sections/checkout-modal";
import { TweaksPanel, TweakSection, TweakRadio, TweakToggle } from "@/components/tweaks/tweaks-panel";

const TWEAK_DEFAULTS = {
  heroLayout: "split",
  accentTheme: "peach",
  showStickyCTA: true,
  problemFirst: true
};

export function PageContent() {
  const [tweaks, setTweakRaw] = useState(TWEAK_DEFAULTS);
  const setTweak = useCallback(
    (edits) => setTweakRaw((prev) => ({ ...prev, ...edits })),
    []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSeries, setModalSeries] = useState("adamas");

  const openModal = useCallback((series) => {
    setModalSeries(series || "adamas");
    setModalOpen(true);
  }, []);
  const scrollToCheck = useCallback(() => {
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Accent theme via CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (tweaks.accentTheme === "maroon") {
      root.style.setProperty("--accent", "#A02828");
      root.style.setProperty("--accent-hover", "#7A1B1B");
      root.style.setProperty("--accent-soft", "#D88A8A");
      root.style.setProperty("--on-accent", "#FFFDF9");
    } else if (tweaks.accentTheme === "bronze") {
      root.style.setProperty("--accent", "#C68A5C");
      root.style.setProperty("--accent-hover", "#8B5A33");
      root.style.setProperty("--accent-soft", "#E8C19A");
      root.style.setProperty("--on-accent", "#1F1F1F");
    } else {
      root.style.setProperty("--accent", "#F3A86D");
      root.style.setProperty("--accent-hover", "#E69352");
      root.style.setProperty("--accent-soft", "#F8B77E");
      root.style.setProperty("--on-accent", "#1F1F1F");
    }
  }, [tweaks.accentTheme]);

  return (
    <>
      <Header onOrder={() => openModal()} />
      <Hero variant={tweaks.heroLayout} onOrder={() => openModal()} onCheck={scrollToCheck} />
      <MarqueeStrip />

      {tweaks.problemFirst ? (
        <>
          <Problem />
          <Solution />
        </>
      ) : (
        <>
          <Solution />
          <Problem />
        </>
      )}

      <WowGallery />
      <SeriesSection onOrder={openModal} />
      <Configurator />
      <CarChecker onOrder={openModal} />
      <Compare />
      <Bundle />
      <Countdown onOrder={() => openModal()} />
      <Funnel />
      <Testimonials />
      <Branches />
      <FAQ />
      <FinalCTA onOrder={() => openModal()} />
      <Footer />

      {tweaks.showStickyCTA && <StickyCTA onOrder={() => openModal()} />}

      <CheckoutModal open={modalOpen} series={modalSeries} onClose={() => setModalOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Hero">
          <TweakRadio label="Layout" value={tweaks.heroLayout}
                      onChange={v => setTweak({ heroLayout: v })}
                      options={[
                        { value: "split",   label: "Split" },
                        { value: "full",    label: "Full" },
                        { value: "gallery", label: "Gallery" }
                      ]}/>
        </TweakSection>
        <TweakSection label="Accent">
          <TweakRadio label="Tema warna" value={tweaks.accentTheme}
                      onChange={v => setTweak({ accentTheme: v })}
                      options={[
                        { value: "peach",   label: "Peach" },
                        { value: "maroon",  label: "Maroon" },
                        { value: "bronze",  label: "Bronze" }
                      ]}/>
        </TweakSection>
        <TweakSection label="Funnel">
          <TweakToggle label="Problem before Solution" value={tweaks.problemFirst}
                       onChange={v => setTweak({ problemFirst: v })}/>
          <TweakToggle label="Sticky CTA bar (mobile)" value={tweaks.showStickyCTA}
                       onChange={v => setTweak({ showStickyCTA: v })}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
