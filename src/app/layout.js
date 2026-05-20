import { Bodoni_Moda } from "next/font/google";
import localFont from "next/font/local";
import { PromoBar } from "@/components/sections/promo-bar";
import "./globals.css";

const montserrat = localFont({
  src: "../../public/fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Ottoman — Sarung Seat Kustom · Kereta Lama Rasa Baru",
  description:
    "Sarung seat kustom Ottoman — fit setiap inci kereta anda. Nappa leather premium, 5 lapisan pelindung. Pasang dalam 90 minit di rumah anda. Dari RM 1,088.",
  openGraph: {
    title: "Ottoman — Sarung Seat Kustom",
    description:
      "Sarung seat kustom Ottoman — fit setiap inci. Nappa leather premium, pasang 90 minit di rumah.",
    siteName: "Ottoman",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms" className={`${montserrat.variable} ${bodoniModa.variable}`}>
      <body>
        <PromoBar />
        {children}
        <noscript>
          <div style={{ padding: "20px", textAlign: "center", fontFamily: "sans-serif" }}>
            Sila aktifkan JavaScript untuk pengalaman terbaik. Hubungi kami di WhatsApp: +60 12-345 6789.
          </div>
        </noscript>
      </body>
    </html>
  );
}
