import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});
const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "portfolio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 
        overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
