"use client";

import React, { useState } from "react";
import { Calculator, IndianRupee, Percent, Clock, ArrowRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(8000000); // 80 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercentage = Math.round((loanAmount / totalPayment) * 100);
  const interestPercentage = 100 - principalPercentage;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Home Loan & EMI Estimator
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Calculate your estimated monthly commitments with live bank interest rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Loan Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loan Amount
                </span>
                <span className="text-base font-extrabold text-brand-navy">
                  ₹{(loanAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹10 L</span>
                <span>₹2.5 Cr</span>
                <span>₹5.0 Cr</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Annual Interest Rate
                </span>
                <span className="text-base font-extrabold text-brand-navy">
                  {interestRate.toFixed(1)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={7.0}
                max={13.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>7.0%</span>
                <span>10.0%</span>
                <span>13.0%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loan Tenure
                </span>
                <span className="text-base font-extrabold text-brand-navy">
                  {tenureYears} Years ({totalMonths} Months)
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-brand-navy text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-1">
                Estimated Monthly EMI
              </div>
              <div className="text-3xl sm:text-4xl font-black text-brand-blue tracking-tight">
                ₹{formatNumber(emi)}
                <span className="text-sm font-normal text-slate-400"> / month</span>
              </div>

              {/* Progress bar ratio */}
              <div className="mt-6 mb-6">
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercentage}%` }}
                    className="bg-brand-blue h-full"
                    title={`Principal: ${principalPercentage}%`}
                  />
                  <div
                    style={{ width: `${interestPercentage}%` }}
                    className="bg-sky-400 h-full"
                    title={`Interest: ${interestPercentage}%`}
                  />
                </div>
                <div className="flex justify-between text-xs mt-2 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                    Principal: {principalPercentage}%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    Interest: {interestPercentage}%
                  </span>
                </div>
              </div>

              {/* Breakdown numbers */}
              <div className="space-y-2.5 text-xs sm:text-sm pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Principal Amount</span>
                  <span className="font-semibold">₹{formatNumber(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Interest Payable</span>
                  <span className="font-semibold text-sky-300">
                    ₹{formatNumber(totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800/80">
                  <span className="text-slate-300 font-bold">Total Amount Payable</span>
                  <span className="font-bold text-white">
                    ₹{formatNumber(totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <a
                href="#contact"
                className="w-full py-3 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-blue/30"
              >
                <span>Get Instant Pre-Approval</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
