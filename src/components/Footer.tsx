import React from "react";
import { Landmark, MapPin, PhoneCall, Globe2, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="footer-section" 
      aria-label="Corporate Footer"
      className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900 relative"
    >
      {/* Footer glow details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-column link/info section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-900 text-left">
          
          {/* Logo Card */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative inline-flex items-center bg-gradient-to-br from-indigo-700 to-violet-900 border border-violet-500/50 text-white rounded-xl px-4 py-2 shadow-lg w-max">
              <div className="absolute -top-1.5 left-3 bg-amber-500 text-[9px] font-black text-slate-950 px-1.5 rounded uppercase tracking-wider">
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
              <div className="ml-3 pl-3 border-l border-white/20">
                <Landmark className="h-6 w-6 text-amber-300" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              India's premier and most trusted school admissions showcase, supporting over 1 million parents in securing stellar futures since 2003.
            </p>
          </div>

          {/* Corporate Office */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <MapPin className="h-4 w-4" />
              <h4 className="text-xs font-black uppercase tracking-wider">Corporate Office</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold pl-6">
              Suite B-5, Ballygunge Park Tower, <br />
              67B Ballygunge Circular Road, <br />
              Kolkata - 700019
            </p>
          </div>

          {/* Ahmedabad Office */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <MapPin className="h-4 w-4" />
              <h4 className="text-xs font-black uppercase tracking-wider">Ahmedabad Office</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold pl-6">
              12/AA, Swastik Chambers, <br />
              Near CU Shah College, Ashram Road, <br />
              Ahmedabad - 380009
            </p>
          </div>

          {/* Contact Details & Social */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <PhoneCall className="h-4 w-4" />
                <h4 className="text-xs font-black uppercase tracking-wider">Call us on</h4>
              </div>
              <ul className="text-xs font-extrabold text-slate-100 pl-6 space-y-1">
                <li><a href="tel:9674805912" className="hover:text-amber-400 transition-colors">9674805912</a></li>
                <li><a href="tel:9674585012" className="hover:text-amber-400 transition-colors">9674585012</a></li>
              </ul>
            </div>

            {/* Social Icons exactly like image */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Follow us on</h4>
              <div className="flex items-center space-x-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-violet-900/40 border border-violet-800/50 flex items-center justify-center text-indigo-300 hover:text-white hover:bg-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Instagram Account"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-violet-900/40 border border-violet-800/50 flex items-center justify-center text-indigo-300 hover:text-white hover:bg-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Facebook Page"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-violet-900/40 border border-violet-800/50 flex items-center justify-center text-indigo-300 hover:text-white hover:bg-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright slice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
          <div>
            Copyright © {currentYear} | All rights reserved. Premier Schools Exhibition
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Association</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
