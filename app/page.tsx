"use client";

import { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import History from "./components/History/History";
import Stacks from "./components/Stacks/Stacks";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import CursorBubbles from "./components/CursorBubbles";
import LoadingScreen from "./components/LoadingScreen";
import SectionWrapper from "./components/SectionWrapper";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <div>
          <CursorBubbles />
          <Header />
          <main>
            <SectionWrapper className="min-h-screen flex items-center">
              <Hero />
            </SectionWrapper>
            <SectionWrapper className="min-h-screen flex items-center">
              <AboutMe />
            </SectionWrapper>
            <SectionWrapper className="min-h-screen flex items-center">
              <History />
            </SectionWrapper>
            <SectionWrapper className="min-h-screen flex items-center">
              <Stacks />
            </SectionWrapper>
            <SectionWrapper className="min-h-screen flex items-center">
              <Projects />
            </SectionWrapper>
            <SectionWrapper className="min-h-screen flex items-center">
              <Contact />
            </SectionWrapper>
          </main>
          <Sidebar />
          <Footer />
        </div>
      )}
    </div>
  );
}
