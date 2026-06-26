import React, { useState } from "react";
import { ArrowUpRight, GraduationCap, Compass, Laptop, Award } from "lucide-react";

interface SchoolCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  badge: string;
  icon: React.ComponentType<any>;
}

const CATEGORIES: SchoolCategory[] = [
  {
    id: "pre-schools",
    title: "Pre-Schools & Early Learning Centres",
    description: "Nurturing foundational skills for toddlers and pre-primary children.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600",
    accent: "from-amber-500 to-orange-600",
    badge: "Age 2 - 6",
    icon: Compass,
  },
  {
    id: "cbse-day",
    title: "K-12 CBSE Day Schools",
    description: "Reputed schools offering complete schooling from Kindergarten to Grade 12.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    accent: "from-blue-500 to-indigo-600",
    badge: "Grade K - 12",
    icon: GraduationCap,
  },
  {
    id: "new-age",
    title: "Heritage to New-Age Schools",
    description: "Time-tested schools to innovative pedagogy, tech enabled, future-ready schools.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    accent: "from-emerald-500 to-teal-600",
    badge: "Tech & Legacy",
    icon: Laptop,
  },
  {
    id: "international",
    title: "International Curriculum Schools",
    description: "Offering IB, Cambridge, Finnish and other global curricula with a global learning environment.",
    image: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=600",
    accent: "from-violet-500 to-fuchsia-600",
    badge: "IB & Cambridge",
    icon: Award,
  },
];

export default function ChooseSchool({ onOpenScheduler }: { onOpenScheduler: () => void }) {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && mobileActiveIndex < CATEGORIES.length - 1) {
      setMobileActiveIndex((prev) => prev + 1);
    } else if (isRightSwipe && mobileActiveIndex > 0) {
      setMobileActiveIndex((prev) => prev - 1);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section 
      id="choose-school" 
      aria-label="Choose School Category Finder"
      className="bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Choose the School That Fits You Best
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Our exhibition hosts curated school tiers based on board patterns, innovative teaching methodologies, and age groups.
          </p>
        </div>

        {/* DESKTOP VIEW: 4 cards grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6 xl:gap-8">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <article
                key={cat.id}
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-end bg-slate-950 focus-within:ring-2 focus-within:ring-violet-500"
              >
                {/* Visual Background image */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Overlay vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Floating Content Card */}
                <div className="relative p-6 text-left space-y-3 z-10">
                  {/* Floating badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full px-2.5 py-1">
                      {cat.badge}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white leading-tight">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {cat.description}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={onOpenScheduler}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-300 group-hover:text-amber-200 transition-colors bg-white/5 group-hover:bg-amber-400 group-hover:text-slate-950 px-3 py-2 rounded-lg border border-white/10 group-hover:border-transparent"
                    >
                      <span>Explore Options</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* MOBILE VIEW: Slider with touch swipe + pagination dots */}
        <div className="lg:hidden relative">
          <div
            className="w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slide container */}
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${mobileActiveIndex * 100}%)` }}
            >
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <article
                    key={cat.id}
                    className="w-full shrink-0 px-1"
                  >
                    <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-100 shadow-lg flex flex-col justify-end bg-slate-950">
                      {/* Visual Background image */}
                      <div className="absolute inset-0">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-80"
                        />
                        {/* Overlay vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      </div>

                      {/* Content Card */}
                      <div className="relative p-6 text-left space-y-3 z-10">
                        <div className="flex items-center justify-between">
                          <span className="inline-block text-[10px] font-black uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full px-2.5 py-1">
                            {cat.badge}
                          </span>
                          <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <IconComponent className="h-4 w-4" />
                          </div>
                        </div>

                        <h3 className="text-lg font-black text-white leading-tight">
                          {cat.title}
                        </h3>
                        
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cat.description}
                        </p>

                        <div className="pt-2">
                          <button
                            onClick={onOpenScheduler}
                            className="inline-flex items-center space-x-1.5 text-xs font-bold bg-amber-400 text-slate-950 px-4 py-2.5 rounded-lg shadow"
                          >
                            <span>Pre-Schedule Appointment</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Pagination dots for mobile */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            {CATEGORIES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActiveIndex === idx ? "w-6 bg-violet-600" : "w-2 bg-slate-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Swipe Assist Tip */}
          <p className="text-center text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-3 flex items-center justify-center gap-1">
            <span>← Swipe to discover tiers →</span>
          </p>
        </div>

      </div>
    </section>
  );
}
