import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Scale, PiggyBank, Eye, HelpCircle } from "lucide-react";

interface HighlightCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    id: "interact-heads",
    title: "Interact Directly with School Heads",
    description: "Get answers straight from the experts, school directors, and admission decision makers.",
    icon: MessageSquare,
  },
  {
    id: "compare-curriculum",
    title: "Compare Curriculum & Pedagogy",
    description: "Understand structural differences between CBSE, ICSE, IB, Cambridge, Finnish & more to find your fit.",
    icon: Scale,
  },
  {
    id: "fee-structures",
    title: "Get Exclusive Fee Structures & Offers",
    description: "Access fully transparent fee sheets, scholarship options, and waiver schemes reserved only for attendees.",
    icon: PiggyBank,
  },
  {
    id: "explore-offerings",
    title: "Explore Schools Offerings",
    description: "Preview infrastructure walkthroughs, sports curricula, advanced labs, and co-curricular culture portfolios.",
    icon: Eye,
  },
  {
    id: "counselling",
    title: "On-the-spot Counselling & Guidance",
    description: "Save hours of research by consulting professional admissions counselors on boarding, admissions, and child aptitude.",
    icon: HelpCircle,
  },
];

export default function ExhibitionSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slidesToShow, setSlidesToShow] = useState(4); // default desktop
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items-to-show calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = HIGHLIGHTS.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section 
      id="exhibition-section" 
      aria-label="Exhibition Highlight Benefits"
      className="bg-indigo-950 pt-16 pb-24 overflow-hidden relative"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            What Makes This Exhibition a Must-Visit
          </h2>
          <p className="text-sm text-indigo-200 mt-2.5 max-w-lg mx-auto">
            Get personalized clarity from direct panel reviews rather than months of cold emails.
          </p>
        </div>

        {/* Carousel Tracks */}
        <div 
          className="w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={containerRef}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
              width: `${(totalSlides / slidesToShow) * 100}%`
            }}
          >
            {HIGHLIGHTS.map((hl) => {
              const IconComp = hl.icon;
              return (
                <div 
                  key={hl.id} 
                  style={{ width: `${100 / totalSlides}%` }}
                  className="px-3 shrink-0"
                >
                  <article className="bg-[#E9E4FF] hover:bg-[#DED7FF] text-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-start text-left space-y-4 h-[240px] shadow-lg shadow-indigo-950/20 transition-colors border border-indigo-200/40 relative group cursor-grab active:cursor-grabbing focus-within:ring-2 focus-within:ring-amber-500">
                    <div className="h-12 w-12 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-700 shrink-0 border border-violet-600/10">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base font-black text-indigo-950 leading-tight group-hover:text-indigo-900 transition-colors">
                        {hl.title}
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {hl.description}
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Curved Dark Backdrop Bottom Section with Circular Arrow Buttons exactly like mockup */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-950 border-t border-slate-900 flex justify-center items-center">
        {/* Curving decorative shape for seamless look */}
        <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        
        <div className="flex items-center space-x-4 z-10" role="group" aria-label="Exhibition slide controls">
          <button
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all ${
              activeIndex === 0
                ? "border-slate-800 text-slate-700 cursor-not-allowed"
                : "border-slate-400 text-slate-300 hover:border-white hover:text-white"
            }`}
            aria-label="Previous Highlight slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Indicator dots */}
          <div className="flex space-x-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === idx ? "w-4 bg-amber-400" : "w-1.5 bg-slate-600 hover:bg-slate-500"
                }`}
                aria-label={`Go to section ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={activeIndex >= maxIndex}
            className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all ${
              activeIndex >= maxIndex
                ? "border-slate-800 text-slate-700 cursor-not-allowed"
                : "border-slate-400 text-slate-300 hover:border-white hover:text-white"
            }`}
            aria-label="Next Highlight slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

    </section>
  );
}
