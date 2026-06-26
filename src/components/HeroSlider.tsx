import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, MapPin, Calendar, Clock, Sparkles, Send, CheckCircle } from "lucide-react";
import { Inquiry } from "../types";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.png";

interface HeroSliderProps {
  onFormSubmit: (inquiry: Inquiry) => void;
  onOpenScheduler: () => void;
}

interface SlideData {
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  location: string;
  dates: string;
  time: string;
  images: string[];
}

const HERO_SLIDES: SlideData[] = [
  {
    title: "Discover Gurugram's Top 30+ Schools",
    subtitle: "ALL IN ONE PLACE",
    highlight: "Trusted Admissions",
    description: "Compare curriculum, interact directly with directors and school heads, and find the perfect match for your child's educational journey.",
    location: "Apparel House, Sec 44, Gurugram",
    dates: "2-3 August 2025 (Sat-Sun)",
    time: "10AM - 6PM",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400", // students
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400", // reading girl
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400", // cute boy
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400", // classroom play
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400", // lab kids
      "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=400", // school smiling
    ],
  },
  {
    title: "International Curriculum & Elite Pedagogy",
    subtitle: "IB, CAMBRIDGE & FINNISH",
    highlight: "Global Standards",
    description: "Explore educational frameworks designed for global success. Give your child early exposure to international opportunities and innovative thinking.",
    location: "Apparel House, Sec 44, Gurugram",
    dates: "2-3 August 2025 (Sat-Sun)",
    time: "10AM - 6PM",
    images: [
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400", // high school class
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400", // presentation
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400", // desk student
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=400", // blackboard
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", // library pile
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=400", // high school reading
    ],
  },
  {
    title: "Heritage Legacies & Future-Ready Tech",
    subtitle: "NURTURING GENIUS",
    highlight: "Legacy & Innovation",
    description: "Find schools blending rich traditions with futuristic, AI-integrated learning environments to groom the next generation of thought leaders.",
    location: "Apparel House, Sec 44, Gurugram",
    dates: "2-3 August 2025 (Sat-Sun)",
    time: "10AM - 6PM",
    images: [
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=400", // robot lab
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=400", // girl code
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400", // design thinking
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400", // tech project
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400", // kid on tablet
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400", // typing child
    ],
  },
];

export default function HeroSlider({ onFormSubmit, onOpenScheduler }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Form states
  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const slideTimer = useRef<NodeJS.Timeout | null>(null);
  const verticalTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-play horizontal slides
  useEffect(() => {
    if (isPlaying) {
      slideTimer.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 7000); // 7 seconds per slide
    }
    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, [isPlaying]);

  // Dual axis vertical slider auto-play
  useEffect(() => {
    if (isPlaying) {
      verticalTimer.current = setInterval(() => {
        setVerticalOffset((prev) => (prev + 1) % 6);
      }, 3500); // Shift vertical images every 3.5s
    }
    return () => {
      if (verticalTimer.current) clearInterval(verticalTimer.current);
    };
  }, [isPlaying]);

  // Touch Swipe Handlers for mobile
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

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phoneNumber || !grade) {
      alert("Please fill out all the fields.");
      return;
    }

    onFormSubmit({
      parentName,
      phoneNumber,
      grade,
      submittedAt: new Date().toISOString(),
    });

    setFormSubmitted(true);
  };

  const handleFormReset = () => {
    setParentName("");
    setPhoneNumber("");
    setGrade("");
    setFormSubmitted(false);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  // Accessible keyboard support for slider controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  return (
    <section
      id="hero"
      aria-label="Welcome and School Enquiry Banner"
      className="relative min-h-screen bg-slate-950 pt-28 pb-16 lg:pb-24 flex items-center overflow-hidden"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background radial gradient visual elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_40%)]" />
      
      {/* Dynamic Slide Background Blur */}
      <div className="absolute inset-0 pointer-events-none opacity-20 blur-[120px] transition-all duration-1000 ease-in-out">
        <div className={`absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full ${currentSlide === 0 ? "bg-indigo-500" : currentSlide === 1 ? "bg-violet-600" : "bg-cyan-500"}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full ${currentSlide === 0 ? "bg-purple-500" : currentSlide === 1 ? "bg-fuchsia-500" : "bg-emerald-500"}`} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Texts and Badge */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left"
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}
          >
            {/* Tag/Highlight */}
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full px-3 py-1 text-xs font-semibold w-max mb-5 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{activeSlide.highlight}</span>
            </div>

            {/* Slider Header Transition */}
            <div className="relative h-auto min-h-[140px] md:min-h-[160px] overflow-hidden">
              <div 
                key={currentSlide}
                className="animate-in fade-in slide-in-from-right-8 duration-500 ease-out"
              >
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] font-display">
                  {activeSlide.title}
                </h1>
                <h2 className="text-lg sm:text-xl font-bold text-amber-300 mt-2.5 tracking-widest uppercase font-mono">
                  {activeSlide.subtitle}
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-lg">
              {activeSlide.description}
            </p>

            {/* Event Badge Card (Styled like images) */}
            <div className="mt-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm max-w-md">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 text-slate-950 p-2.5 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest">Exhibition Venue</h3>
                  <div className="text-sm font-extrabold text-white">{activeSlide.location}</div>
                  <div className="text-xs text-slate-400 font-semibold">{activeSlide.dates}</div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{activeSlide.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual Axis Controls */}
            <div className="flex items-center space-x-4 mt-8">
              <div className="flex items-center space-x-2" role="group" aria-label="Slider Controls">
                <button
                  onClick={prevSlide}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Autoplay Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800/40 transition-colors"
                aria-label={isPlaying ? "Pause auto-play" : "Play auto-play"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-amber-400" />
                    <span>Autoplay Active</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-slate-400" />
                    <span>Paused</span>
                  </>
                )}
              </button>

              {/* Dots indicator */}
              <div className="flex items-center space-x-1.5 ml-auto">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-6 bg-amber-400" : "w-2 bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Vertical Dual-Axis Pill Images (As shown in screenshot) */}
          <div className="lg:col-span-4 flex justify-center items-center h-[340px] sm:h-[450px] overflow-hidden">
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-sm h-full relative px-2">
              
              {/* Pillar 1: Scrolls Upwards */}
              <div className="flex flex-col space-y-4 h-full relative overflow-hidden">
                <div 
                  className="flex flex-col space-y-4 absolute transition-all duration-700 ease-in-out"
                  style={{ transform: `translateY(${-((verticalOffset * 30) % 90)}px)` }}
                >
                  {/* Pill Images row 1 */}
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-indigo-500/20 shadow-lg shadow-slate-950/50 group shrink-0 relative">
                    <img 
                      src={image1} 
                      alt="Student active learning" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-violet-500/20 shadow-lg shadow-slate-950/50 group shrink-0 relative">
                    <img 
                      src={image2}
                      alt="Student reading" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-cyan-500/20 shadow-lg shadow-slate-950/50 group shrink-0 relative">
                    <img 
                      src={image3} 
                      alt="Preschooler playing" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                </div>
              </div>

              {/* Pillar 2: Scrolls Downwards */}
              <div className="flex flex-col space-y-4 h-full relative overflow-hidden pt-8">
                <div 
                  className="flex flex-col space-y-4 absolute transition-all duration-700 ease-in-out"
                  style={{ transform: `translateY(${(-((verticalOffset * 25) % 80) + 10)}px)` }}
                >
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-amber-500/20 shadow-lg shadow-slate-950/50 group shrink-0">
                    <img 
                      src={image4} 
                      alt="Student writing" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-indigo-500/20 shadow-lg shadow-slate-950/50 group shrink-0">
                    <img 
                      src={image5} 
                      alt="Computer lab learning" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-violet-500/20 shadow-lg shadow-slate-950/50 group shrink-0">
                    <img 
                      src={image6} 
                      alt="Happy students group" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                </div>
              </div>

              {/* Pillar 3: Scrolls Upwards */}
              <div className="flex flex-col space-y-4 h-full relative overflow-hidden">
                <div 
                  className="flex flex-col space-y-4 absolute transition-all duration-700 ease-in-out"
                  style={{ transform: `translateY(${-((verticalOffset * 35) % 110)}px)` }}
                >
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-cyan-500/20 shadow-lg shadow-slate-950/50 group shrink-0">
                    <img 
                      src={activeSlide.images[1]} 
                      alt="Lab student portrait" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-amber-500/20 shadow-lg shadow-slate-950/50 group shrink-0">
                    <img 
                      src={activeSlide.images[2]} 
                      alt="Outdoor classroom" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="h-32 sm:h-44 w-full rounded-full overflow-hidden border-2 border-indigo-500/20 shadow-lg shadow-slate-950/50 group shrink-0">
                    <img 
                      src={activeSlide.images[0]} 
                      alt="Student thumbs up" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: "Enquire Now" Form (Styled exactly like the mockups) */}
          <div className="lg:col-span-3 lg:pl-2" id="enquire-form-card">
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-slate-950/50 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-violet-500" />
              
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="text-left">
                    <h3 className="text-xl font-extrabold text-white tracking-tight">Enquire Now</h3>
                    <p className="text-xs text-slate-400 mt-1">Get immediate brochure and admission invites</p>
                  </div>

                  {/* Input Parent's Name */}
                  <div>
                    <label htmlFor="form-parent-name" className="block text-left text-xs font-semibold text-slate-400 mb-1.5">
                      Parent's Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="form-parent-name"
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 text-slate-100 rounded-xl py-3 px-4 text-xs transition-all focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  {/* Input Phone number */}
                  <div>
                    <label htmlFor="form-phone" className="block text-left text-xs font-semibold text-slate-400 mb-1.5">
                      Phone Number <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. +91 96748 05912"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 text-slate-100 rounded-xl py-3 px-4 text-xs transition-all focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  {/* Input Target Grade */}
                  <div>
                    <label htmlFor="form-grade" className="block text-left text-xs font-semibold text-slate-400 mb-1.5">
                      Which grade are you looking for? <span className="text-amber-500">*</span>
                    </label>
                    <select
                      id="form-grade"
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 text-slate-200 rounded-xl py-3 px-4 text-xs transition-all focus:outline-none"
                    >
                      <option value="" className="text-slate-600">Select Grade</option>
                      <option value="Pre-Primary">Pre-Primary (Toddler - KG)</option>
                      <option value="Primary (Grade 1-5)">Primary (Grade 1-5)</option>
                      <option value="Middle School (Grade 6-8)">Middle School (Grade 6-8)</option>
                      <option value="High School (Grade 9-12)">High School (Grade 9-12)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3.5 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/10 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>SUBMIT</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenScheduler}
                      className="w-full mt-2.5 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 text-amber-400 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                    >
                      Schedule Appointment Instead
                    </button>
                  </div>
                </form>
              ) : (
                /* Form Submission Success state */
                <div className="py-8 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-indigo-500/20 text-indigo-400 p-3.5 rounded-full border border-indigo-500/30">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Enquiry Received!</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                      Our admissions support team will call you within 24 hours.
                    </p>
                  </div>
                  <div className="pt-4 space-y-2 w-full">
                    <button
                      onClick={onOpenScheduler}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-2 px-3 rounded-xl text-xs shadow"
                    >
                      Secure Instant Meeting Spot
                    </button>
                    <button
                      onClick={handleFormReset}
                      className="w-full text-slate-500 hover:text-slate-400 font-medium text-xs py-1"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
