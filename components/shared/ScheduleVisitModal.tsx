"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Video, MapPin, CheckCircle2, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Property } from "@/types";

interface ScheduleVisitModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({
  property,
  isOpen,
  onClose,
}: ScheduleVisitModalProps) {
  const [tourType, setTourType] = useState<"in-person" | "video">("in-person");
  const [date, setDate] = useState("Tomorrow");
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM - 12:00 PM)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen || !property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const handleClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-4">
        <div className="fixed inset-0" onClick={handleClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-lg overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Schedule a Private Viewing
              </h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {isBooked ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-brand-navy mb-1">
                  Viewing Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-xs mx-auto">
                  Your appointment for <strong className="text-brand-navy">{property.title}</strong> has been scheduled for {date} during {timeSlot}.
                </p>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-left text-xs text-slate-500 mb-5">
                  <p className="font-semibold text-brand-navy mb-1">Your Host:</p>
                  <p>{property.agent.name} ({property.agent.phone})</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    A WhatsApp confirmation with Google Maps location pin has been dispatched.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property summary */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <img
                    src={property.images[0]}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-brand-navy truncate">
                      {property.title}
                    </h5>
                    <p className="text-xs text-slate-400 truncate">
                      {property.location}
                    </p>
                    <p className="text-xs font-extrabold text-brand-blue">
                      {property.price}
                    </p>
                  </div>
                </div>

                {/* Tour Mode */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Tour Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setTourType("in-person")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        tourType === "in-person"
                          ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>In-Person Visit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourType("video")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        tourType === "video"
                          ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>3D Video Call</span>
                    </button>
                  </div>
                </div>

                {/* Day Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Today", "Tomorrow", "This Weekend"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDate(d)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                          date === d
                            ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Morning (10:00 AM - 12:00 PM)">
                      Morning (10:00 AM - 12:00 PM)
                    </option>
                    <option value="Afternoon (02:00 PM - 04:00 PM)">
                      Afternoon (02:00 PM - 04:00 PM)
                    </option>
                    <option value="Evening (05:00 PM - 07:00 PM)">
                      Evening (05:00 PM - 07:00 PM)
                    </option>
                  </select>
                </div>

                {/* Personal details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sameer Khanna"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition-all"
                >
                  Confirm Site Visit Booking
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
