import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, Landmark } from "lucide-react";

interface HeaderProps {
  onOpenScheduler: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ onOpenScheduler, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Schools", targetId: "participating-schools" },
    { label: "Find Your Fit", targetId: "choose-school" },
    { label: "Key Highlights", targetId: "exhibition-section" },
    { label: "Contact", targetId: "footer-section" },
  ];

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(targetId);
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-slate-800/50"
          : "bg-slate-950/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-3 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg p-1"
          aria-label="Premier Schools Exhibition, Back to top"
        >
          {/* Logo badge matching the image */}
          <div className="relative flex items-center bg-gradient-to-br from-indigo-700 to-violet-900 border border-violet-500/50 text-white rounded-lg px-3 py-1.5 shadow-md shadow-indigo-950/40">
            <div className="absolute -top-1.5 left-2 bg-amber-500 text-[8px] font-bold text-slate-950 px-1 rounded uppercase tracking-wider">
              22nd Edition
            </div>
            <div className="flex flex-col mt-0.5">
              <span className="text-sm font-black tracking-tight leading-none text-white">
                Premier Schools
              </span>
              <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase leading-none mt-0.5">
                Exhibition
              </span>
            </div>
            <div className="ml-3 pl-2.5 border-l border-white/20">
              <Landmark className="h-5 w-5 text-amber-300" />
            </div>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.targetId)}
              className="text-slate-300 hover:text-white font-medium text-sm transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => handleNavClick("enquire-form-card")}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            Enquire Now
          </button>
          <button
            onClick={onOpenScheduler}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Calendar className="h-4 w-4" />
            <span>Pre-Schedule Now</span>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onOpenScheduler}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Pre-schedule Appointment"
          >
            <Calendar className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Main Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 border-b border-slate-800 backdrop-blur-lg shadow-2xl py-6 px-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.targetId)}
                className="text-left text-slate-300 hover:text-white font-medium text-base py-2 border-b border-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded px-2"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <button
                onClick={() => handleNavClick("enquire-form-card")}
                className="text-center text-slate-300 hover:text-white font-medium py-2 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors"
              >
                Enquire Now
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScheduler();
                }}
                className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg shadow-md transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Pre-Schedule Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
