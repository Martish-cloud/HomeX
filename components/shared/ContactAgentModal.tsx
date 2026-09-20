"use client";

import React, { useState } from "react";
import { X, MessageSquare, Phone, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Agent, Property } from "@/types";

interface ContactAgentModalProps {
  agent: Agent | null;
  property?: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactAgentModal({
  agent,
  property,
  isOpen,
  onClose,
}: ContactAgentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    property
      ? `Hi ${agent?.name}, I am interested in "${property.title}" (${property.price}). Please share the detailed brochure and floor plans.`
      : `Hi ${agent?.name}, I am looking for luxury property investment opportunities.`
  );
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !agent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
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
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                Contact Verified Advisor
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
            {isSent ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-brand-navy mb-1">
                  Enquiry Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-xs mx-auto">
                  {agent.name} has received your inquiry and will reach out via WhatsApp and phone shortly.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Agent Card */}
                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-13 h-13 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-brand-navy">
                        {agent.name}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                    </div>
                    <p className="text-xs text-slate-400 truncate">{agent.role}</p>
                    <p className="text-[11px] text-brand-blue font-semibold mt-0.5">
                      ★ {agent.rating} ({agent.reviewsCount} reviews) • {agent.experienceYears} yrs exp
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kavita Roy"
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

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Advisor</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
