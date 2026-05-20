// Ottoman seat cover — App root
const { useState: useSA, useEffect: useEA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "split",
  "accentTheme": "peach",
  "showStickyCTA": true,
  "headline": "Kereta lama, rasa baru balik.",
  "problemFirst": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [modalOpen, setModalOpen] = useSA(false);
  const [modalSeries, setModalSeries] = useSA("adamas");

  const openModal = (series) => {
    setModalSeries(series || "adamas");
    setModalOpen(true);
  };
  const scrollToCheck = () => {
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Apply accent theme via CSS variable swap
  useEA(() => {
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
      <PromoBar/>
      <Hero variant={tweaks.heroLayout} onOrder={() => openModal()} onCheck={scrollToCheck}/>
      <MarqueeStrip/>

      {tweaks.problemFirst ? (
        <>
          <Problem/>
          <Solution/>
        </>
      ) : (
        <>
          <Solution/>
          <Problem/>
        </>
      )}

      <WowGallery/>
      <SeriesSection onOrder={openModal}/>
      <Configurator/>
      <CarChecker onOrder={openModal}/>
      <Compare/>
      <Bundle/>
      <Countdown onOrder={() => openModal()}/>
      <Funnel/>
      <Testimonials/>
      <Branches/>
      <FAQ/>
      <FinalCTA onOrder={() => openModal()}/>
      <Footer/>

      {tweaks.showStickyCTA && <StickyCTA onOrder={() => openModal()}/>}

      <CheckoutModal open={modalOpen} series={modalSeries} onClose={() => setModalOpen(false)}/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio label="Layout" value={tweaks.heroLayout}
                      onChange={v => setTweak('heroLayout', v)}
                      options={[
                        { value: "split",   label: "Split" },
                        { value: "full",    label: "Full" },
                        { value: "gallery", label: "Gallery" }
                      ]}/>
        </TweakSection>

        <TweakSection label="Accent">
          <TweakRadio label="Tema warna" value={tweaks.accentTheme}
                      onChange={v => setTweak('accentTheme', v)}
                      options={[
                        { value: "peach",   label: "Peach" },
                        { value: "maroon",  label: "Maroon" },
                        { value: "bronze",  label: "Bronze" }
                      ]}/>
        </TweakSection>

        <TweakSection label="Funnel">
          <TweakToggle label="Problem before Solution" value={tweaks.problemFirst}
                       onChange={v => setTweak('problemFirst', v)}/>
          <TweakToggle label="Sticky CTA bar (mobile)" value={tweaks.showStickyCTA}
                       onChange={v => setTweak('showStickyCTA', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
