import React from "react";
import { ArrowUpRight, Calendar, Bell, Users } from "lucide-react";

interface AppointmentBannerProps {
  onOpenScheduler: () => void;
}

export default function AppointmentBanner({ onOpenScheduler }: AppointmentBannerProps) {
  return (
    <section 
      id="appointment-banner" 
      aria-label="Direct Admissions Pre-Scheduling"
      className="relative bg-slate-950 py-20 lg:py-24 overflow-hidden border-b border-slate-900"
    >
      {/* Background Unsplash image with rich gradients */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200"
          alt="Bustling modern educational exhibition stall"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25"
        />
        {/* Subtle blur overlay & dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Left / Main text content */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Users className="h-3.5 w-3.5 text-amber-400" />
              <span>Exclusive Parent Benefit</span>
            </div>
            
            <span className="block text-lg font-bold text-violet-300 italic">
              Exciting Opportunities for Parents!
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] max-w-2xl font-display">
              Pre-schedule Your School Appointments
            </h2>
            
            <p className="text-xl font-bold text-amber-400 font-mono tracking-widest uppercase">
              To Avoid Rush
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Don't wait in long queues at individual school stalls. Pre-scheduling gets you direct priority entry, a reserved slot with the Admissions Heads, and individual portfolio counselling.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Bell className="h-4 w-4 text-violet-400" />
                <span>Instant Confirmation ticket</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Calendar className="h-4 w-4 text-emerald-400" />
                <span>Aug 2 - 3, Apparel House</span>
              </div>
            </div>
          </div>

          {/* Right Action button block */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={onOpenScheduler}
              className="group flex items-center bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-black px-6 py-4 rounded-xl text-sm tracking-wider uppercase shadow-xl transition-all duration-300 hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <span>PRE-SCHEDULE NOW</span>
              <div className="ml-3 p-1.5 rounded-lg bg-amber-500/20 group-hover:bg-slate-950/20 transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
