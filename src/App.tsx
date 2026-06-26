/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Stats from "./components/Stats";
import SchoolMarquee from "./components/SchoolMarquee";
import ChooseSchool from "./components/ChooseSchool";
import AppointmentBanner from "./components/AppointmentBanner";
import ExhibitionSlider from "./components/ExhibitionSlider";
import Footer from "./components/Footer";
import PreScheduleModal from "./components/PreScheduleModal";
import { Inquiry, Appointment } from "./types";

export default function App() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleFormSubmit = (inquiry: Inquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
    // Optionally trigger a visual toast if wanted, handled beautifully in HeroSlider
  };

  const handleAppointmentScheduled = (app: Appointment) => {
    setAppointments((prev) => [app, ...prev]);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* Skip to Content - Essential WCAG 2.2 AA Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-500 focus:text-slate-950 focus:font-black focus:px-4 focus:py-3.5 focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        Skip to main content
      </a>

      {/* Sticky Header Navigation */}
      <Header
        onOpenScheduler={() => setIsSchedulerOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Stage */}
      <main id="main-content" className="relative focus:outline-none" tabIndex={-1}>
        
        {/* Hero Banner + Dual-Axis Image Grid + Enquiry Card */}
        <HeroSlider 
          onFormSubmit={handleFormSubmit}
          onOpenScheduler={() => setIsSchedulerOpen(true)}
        />

        {/* Dynamic Laurel Milestones Section */}
        <Stats />

        {/* Participating School Continuous Sling Marquee */}
        <SchoolMarquee />

        {/* Choose Your Fit - Desktop grid to mobile swipeable cards */}
        <ChooseSchool 
          onOpenScheduler={() => setIsSchedulerOpen(true)}
        />

        {/* Pre-schedule appointments CTA Banner */}
        <AppointmentBanner 
          onOpenScheduler={() => setIsSchedulerOpen(true)}
        />

        {/* What Makes Exhibition Must Visit Slider Section */}
        <ExhibitionSlider />

      </main>

      {/* Corporate Info Footer */}
      <Footer />

      {/* Scheduler Modal Drawer */}
      <PreScheduleModal
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onSubmit={handleAppointmentScheduled}
      />

    </div>
  );
}

