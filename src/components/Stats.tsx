import React from "react";

interface StatItem {
  number: string;
  label: string;
  context: string;
}

const STATS_DATA: StatItem[] = [
  {
    number: "1 Million+",
    label: "Trusted by Parents",
    context: "Across all editions",
  },
  {
    number: "22+ Years",
    label: "of Educational Legacy",
    context: "Continuous leadership",
  },
  {
    number: "500+",
    label: "Participating Schools",
    context: "Elite global & national",
  },
  {
    number: "17 Cities",
    label: "Across the Globe",
    context: "International footprint",
  },
];

export default function Stats() {
  return (
    <section 
      id="stats-section" 
      aria-label="Exhibition Milestones"
      className="relative bg-white py-12 md:py-16 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {STATS_DATA.map((stat, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-4 relative group"
            >
              {/* Laurel Wreath SVG Graphics */}
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                {/* Golden wreath leaves */}
                <svg
                  className="absolute inset-0 w-full h-full text-amber-500/80 transition-transform duration-500 group-hover:scale-110"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left Wreath Branch */}
                  <path d="M 22 75 C 10 55 15 25 45 15" />
                  <path d="M 18 68 C 12 60 15 54 21 56" fill="currentColor" opacity="0.3" />
                  <path d="M 15 52 C 10 44 14 38 20 42" fill="currentColor" opacity="0.3" />
                  <path d="M 18 36 C 14 28 20 22 25 28" fill="currentColor" opacity="0.3" />
                  <path d="M 28 22 C 26 15 34 11 36 18" fill="currentColor" opacity="0.3" />
                  <path d="M 40 14 C 41 8 49 7 47 14" fill="currentColor" opacity="0.3" />

                  {/* Right Wreath Branch */}
                  <path d="M 78 75 C 90 55 85 25 55 15" />
                  <path d="M 82 68 C 88 60 85 54 79 56" fill="currentColor" opacity="0.3" />
                  <path d="M 85 52 C 90 44 86 38 80 42" fill="currentColor" opacity="0.3" />
                  <path d="M 82 36 C 86 28 80 22 75 28" fill="currentColor" opacity="0.3" />
                  <path d="M 72 22 C 74 15 66 11 64 18" fill="currentColor" opacity="0.3" />
                  <path d="M 60 14 C 59 8 51 7 53 14" fill="currentColor" opacity="0.3" />
                </svg>
                
                {/* Stat Number */}
                <div className="z-10 flex flex-col justify-center items-center">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                    {stat.number.split(" ")[0]}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase mt-0.5 tracking-wider">
                    {stat.number.split(" ").slice(1).join(" ") || "Legacy"}
                  </span>
                </div>
              </div>

              {/* Label and Context */}
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
                  {stat.label}
                </h4>
                <p className="text-[11px] font-medium text-slate-400">
                  {stat.context}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
