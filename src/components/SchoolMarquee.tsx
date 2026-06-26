import React from "react";
import { Landmark } from "lucide-react";

interface SchoolMarqueeItem {
  name: string;
  location: string;
  logoColor: string;
  textColor: string;
}

const ROW_ONE_SCHOOLS: SchoolMarqueeItem[] = [
  { name: "Harrow International School", location: "Bengaluru", logoColor: "bg-indigo-950 text-indigo-200", textColor: "text-slate-800" },
  { name: "Shrewsbury International School", location: "Bangkok", logoColor: "bg-blue-950 text-blue-200", textColor: "text-slate-800" },
  { name: "King's College India", location: "Rohtak", logoColor: "bg-red-950 text-red-200", textColor: "text-slate-800" },
  { name: "Woodstock School", location: "Mussoorie", logoColor: "bg-emerald-950 text-emerald-200", textColor: "text-slate-800" },
  { name: "The Aga Khan Academy", location: "Mombasa", logoColor: "bg-teal-950 text-teal-200", textColor: "text-slate-800" },
];

const ROW_TWO_SCHOOLS: SchoolMarqueeItem[] = [
  { name: "The International School Bangalore", location: "TISB", logoColor: "bg-cyan-950 text-cyan-200", textColor: "text-slate-800" },
  { name: "Pathways World School", location: "Gurugram", logoColor: "bg-violet-950 text-violet-200", textColor: "text-slate-800" },
  { name: "Heritage International School", location: "Delhi NCR", logoColor: "bg-amber-950 text-amber-200", textColor: "text-slate-800" },
  { name: "The Doon School", location: "Dehradun", logoColor: "bg-slate-900 text-slate-200", textColor: "text-slate-800" },
  { name: "Mayo College", location: "Ajmer", logoColor: "bg-rose-950 text-rose-200", textColor: "text-slate-800" },
];

export default function SchoolMarquee() {
  // Duplicate arrays to create seamless infinite scroll loop
  const rowOneCombined = [...ROW_ONE_SCHOOLS, ...ROW_ONE_SCHOOLS, ...ROW_ONE_SCHOOLS];
  const rowTwoCombined = [...ROW_TWO_SCHOOLS, ...ROW_TWO_SCHOOLS, ...ROW_TWO_SCHOOLS];

  return (
    <section 
      id="participating-schools" 
      aria-label="Participating Elite Schools Marquee"
      className="bg-slate-50 py-16 overflow-hidden border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Participating Schools
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Connect directly with representatives from leading global day, boarding, and international schools.
        </p>
      </div>

      {/* Marquee Container with custom animation pause properties */}
      <div className="space-y-6 w-full relative">
        
        {/* Row 1: Flows Left to Right (Sling scroll) */}
        <div 
          className="w-full overflow-hidden flex"
          role="region"
          aria-label="Participating Schools Scrolling Left to Right"
        >
          {/* Marquee inner track */}
          <div className="flex animate-marquee-left hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] space-x-6 min-w-max px-4">
            {rowOneCombined.map((school, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center space-x-4 bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm w-72 h-20 hover:border-slate-300 hover:shadow-md transition-all group shrink-0 select-none cursor-pointer"
                tabIndex={0}
                aria-label={`${school.name}, location ${school.location}`}
              >
                <div className={`h-11 w-11 rounded-lg ${school.logoColor} flex items-center justify-center shrink-0 shadow-inner`}>
                  <Landmark className="h-5 w-5" />
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-xs font-black text-slate-800 truncate tracking-tight">
                    {school.name}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider uppercase font-mono">
                    {school.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flows Right to Left (Sling scroll) */}
        <div 
          className="w-full overflow-hidden flex"
          role="region"
          aria-label="Participating Schools Scrolling Right to Left"
        >
          {/* Marquee inner track */}
          <div className="flex animate-marquee-right hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] space-x-6 min-w-max px-4">
            {rowTwoCombined.map((school, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center space-x-4 bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm w-72 h-20 hover:border-slate-300 hover:shadow-md transition-all group shrink-0 select-none cursor-pointer"
                tabIndex={0}
                aria-label={`${school.name}, location ${school.location}`}
              >
                <div className={`h-11 w-11 rounded-lg ${school.logoColor} flex items-center justify-center shrink-0 shadow-inner`}>
                  <Landmark className="h-5 w-5" />
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-xs font-black text-slate-800 truncate tracking-tight">
                    {school.name}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider uppercase font-mono">
                    {school.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CSS keyframe inject block inside component to ensure standalone support */}
      <style>{`
        @keyframes marquee-left-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes marquee-right-scroll {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left-scroll 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right-scroll 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
