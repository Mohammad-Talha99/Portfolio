'use client'
import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Services from "./components/Services";
import Work from "./components/Work";

import { useTheme } from "./components/ThemeProvider";

export default function Home() {

  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <>
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
    </>
  );
}
