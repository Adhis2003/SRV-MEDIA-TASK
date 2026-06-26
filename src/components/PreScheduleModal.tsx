import React, { useState } from "react";
import { X, Calendar, Clock, BookOpen, User, Phone, Mail, CheckCircle2, Award, Printer, ArrowRight } from "lucide-react";
import { Appointment } from "../types";

interface PreScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
}

const PARTICIPATING_SCHOOLS = [
  "Harrow International School (Bengaluru)",
  "Shrewsbury International School (Bangkok)",
  "King's College India (Rohtak)",
  "Woodstock School (Mussoorie)",
  "The Aga Khan Academy (Mombasa)",
  "The International School Bangalore (TISB)",
  "Pathways World School",
  "Heritage International School",
  "The Doon School (Dehradun)",
  "Mayo College (Ajmer)",
];

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:15 AM - 12:15 PM",
  "12:30 PM - 01:30 PM",
  "02:00 PM - 03:00 PM",
  "03:15 PM - 04:15 PM",
  "04:30 PM - 05:30 PM",
];

export default function PreScheduleModal({ isOpen, onClose, onSubmit }: PreScheduleModalProps) {
  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("");
  const [preferredDate, setPreferredDate] = useState("2025-08-02"); // Default Saturday
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketData, setTicketData] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phoneNumber || !schoolName || !preferredTimeSlot || !grade) {
      alert("Please fill in all required fields.");
      return;
    }

    const appointment: Appointment = {
      parentName,
      phoneNumber,
      email,
      schoolName,
      grade,
      preferredDate,
      preferredTimeSlot,
      scheduledAt: new Date().toISOString(),
    };

    onSubmit(appointment);
    setTicketData(appointment);
    setIsSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setParentName("");
    setPhoneNumber("");
    setEmail("");
    setSchoolName("");
    setGrade("");
    setPreferredDate("2025-08-02");
    setPreferredTimeSlot("");
    setIsSuccess(false);
    setTicketData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleReset}
      />

      {/* Modal Container */}
      <div className="relative bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform scale-100 transition-all duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-950 to-slate-900">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 text-slate-950 p-2 rounded-lg">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-bold tracking-tight text-white">
                {isSuccess ? "Appointment Confirmed" : "Pre-Schedule School Appointment"}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isSuccess ? "Your fast-track entry ticket is ready" : "Reserve direct 1-on-1 slots with School Admissions heads"}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Parent Info */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <User className="h-3.5 w-3.5" />
                  Parent & Student Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-medium text-slate-400 mb-1.5">
                      Parent's Full Name <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-slate-100 rounded-lg py-2.5 px-3 text-sm transition-all focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-medium text-slate-400 mb-1.5">
                      Phone Number <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. +91 96748 05912"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-slate-100 rounded-lg py-2.5 px-3 text-sm transition-all focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-medium text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-slate-100 rounded-lg py-2.5 px-3 text-sm transition-all focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-grade" className="block text-xs font-medium text-slate-400 mb-1.5">
                      Target Grade/Class <span className="text-amber-500">*</span>
                    </label>
                    <select
                      id="modal-grade"
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-slate-100 rounded-lg py-2.5 px-3 text-sm transition-all focus:outline-none"
                    >
                      <option value="">Select Grade</option>
                      <option value="Pre-School">Pre-School / Toddler</option>
                      <option value="Kindergarten">Kindergarten / Nursery</option>
                      <option value="Primary (Grade 1-5)">Primary (Grade 1-5)</option>
                      <option value="Middle School (Grade 6-8)">Middle School (Grade 6-8)</option>
                      <option value="High School (Grade 9-10)">High School (Grade 9-10)</option>
                      <option value="Senior Secondary (Grade 11-12)">Senior Secondary (Grade 11-12)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  Appointment Preferences
                </h3>

                <div>
                  <label htmlFor="modal-school" className="block text-xs font-medium text-slate-400 mb-1.5">
                    Select School to Meet <span className="text-amber-500">*</span>
                  </label>
                  <select
                    id="modal-school"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-slate-100 rounded-lg py-2.5 px-3 text-sm transition-all focus:outline-none"
                  >
                    <option value="">Choose a Participating School</option>
                    {PARTICIPATING_SCHOOLS.map((school) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Preferred Date <span className="text-amber-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreferredDate("2025-08-02")}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          preferredDate === "2025-08-02"
                            ? "bg-amber-500/20 border-amber-500 text-amber-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        Aug 2 (Sat), 2025
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredDate("2025-08-03")}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          preferredDate === "2025-08-03"
                            ? "bg-amber-500/20 border-amber-500 text-amber-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        Aug 3 (Sun), 2025
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-time" className="block text-xs font-medium text-slate-400 mb-1.5">
                      Preferred Time Slot <span className="text-amber-500">*</span>
                    </label>
                    <select
                      id="modal-time"
                      required
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-slate-100 rounded-lg py-2.5 px-3 text-sm transition-all focus:outline-none"
                    >
                      <option value="">Select Time Slot</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-amber-500/10 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>CONFIRM PRE-SCHEDULE SLOT</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-3">
                  By submitting, you agree to receive scheduling updates and event entry credentials.
                </p>
              </div>

            </form>
          ) : (
            /* Ticket Confirmation View */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-3 rounded-full mb-3">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Appointment Confirmed!</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
                  Your entry credentials and slot with the School Admissions Head have been locked.
                </p>
              </div>

              {/* Visual Ticket Graphic */}
              <div className="relative bg-slate-950 rounded-2xl border-2 border-indigo-900 overflow-hidden shadow-xl" id="appointment-ticket">
                {/* Visual Ticket Side Cuts (Classic Ticket Styling) */}
                <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-slate-900 border-r-2 border-indigo-900 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-slate-900 border-l-2 border-indigo-900 -translate-y-1/2" />
                
                {/* Ticket Header */}
                <div className="bg-indigo-950 border-b border-indigo-900/50 p-4 flex justify-between items-center px-6">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">Admissions Express Pass</span>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-300">
                    PASS-#{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Parent Representative</div>
                      <div className="text-base font-bold text-white">{ticketData?.parentName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Contact Number</div>
                      <div className="text-sm font-semibold text-slate-300">{ticketData?.phoneNumber}</div>
                    </div>
                    {ticketData?.email && (
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</div>
                        <div className="text-sm text-slate-300 truncate">{ticketData?.email}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Target Grade</div>
                      <div className="text-sm font-semibold text-amber-400">{ticketData?.grade}</div>
                    </div>
                  </div>

                  <div className="space-y-4 md:border-l md:border-dashed md:border-slate-800 md:pl-6">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Selected School</div>
                      <div className="text-sm font-black text-indigo-300">{ticketData?.schoolName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Reserved Date
                      </div>
                      <div className="text-sm font-bold text-white">
                        {ticketData?.preferredDate === "2025-08-02" ? "August 2 (Saturday), 2025" : "August 3 (Sunday), 2025"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Reserved Time
                      </div>
                      <div className="text-sm font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-2 py-1 inline-block mt-1">
                        {ticketData?.preferredTimeSlot}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Venue Location</div>
                      <div className="text-xs text-slate-400">Apparel House, Sec 44, Gurugram</div>
                    </div>
                  </div>
                </div>

                {/* Ticket Footer / QR Placeholder */}
                <div className="bg-slate-900 border-t border-slate-800 p-4 text-center text-[10px] font-mono text-slate-500 tracking-widest px-6">
                  PRESENT THIS TICKET AT THE EXCLUSIVES RECEPTION FOR INSTANT Fast-Track ENTRY
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-3 px-4 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Ticket / Save PDF</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-colors"
                >
                  <span>Done</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
