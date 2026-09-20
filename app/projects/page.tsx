"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PROJECTS } from "@/data/projects";
import { Project, City } from "@/types";
import {
  Building2,
  MapPin,
  Calendar,
  ShieldCheck,
  Download,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";
import { ListPropertyModal } from "@/components/shared/ListPropertyModal";
import { FavoritesDrawer } from "@/components/shared/FavoritesDrawer";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [currentCity, setCurrentCity] = useState<City>("Bengaluru");
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isBrochureDownloaded, setIsBrochureDownloaded] = useState(false);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedStatus !== "All" && proj.status !== selectedStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        proj.name.toLowerCase().includes(q) ||
        proj.developer.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleDownloadBrochure = (proj: Project) => {
    setSelectedProject(proj);
    setIsBrochureDownloaded(true);
    setTimeout(() => setIsBrochureDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        currentCity={currentCity}
        onSelectCity={setCurrentCity}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Masterplanned Real Estate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Flagship Developer Projects
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover landmark luxury townships, integrated smart cities, and new high-rise launches from India’s top builders.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project, builder, location..."
              className="w-full px-4 py-2 text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:border-brand-blue bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["All", "New Launch", "Under Construction", "Ready to Move"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedStatus === st
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-brand-navy/95 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {project.status}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 text-brand-blue text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RERA Registered</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider">
                      {project.developer}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Possession: {project.possessionDate}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-brand-navy group-hover:text-brand-blue transition-colors mb-2">
                    {project.name}
                  </h3>

                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{project.location}, {project.city}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Configurations */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.configurations.map((cfg) => (
                      <span
                        key={cfg}
                        className="text-xs font-bold bg-brand-blue-light/80 text-brand-navy px-3 py-1 rounded-full border border-brand-blue/15"
                      >
                        {cfg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Starting from</span>
                    <span className="text-2xl font-black text-brand-navy">
                      {project.startingPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadBrochure(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Brochure</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition-all"
                    >
                      View Plans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brochure Download Notification */}
        {isBrochureDownloaded && (
          <div className="fixed bottom-6 right-6 z-50 bg-brand-navy text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">
              Official brochure for {selectedProject?.name} downloaded!
            </span>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="fixed inset-0" onClick={() => setSelectedProject(null)} />
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 z-10">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-brand-blue uppercase">
                    {selectedProject.developer}
                  </span>
                  <h3 className="text-2xl font-black text-brand-navy">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-wrap justify-between gap-4">
                  <div>
                    <span className="text-slate-400 block text-xs">RERA Number</span>
                    <span className="font-mono font-bold text-brand-navy">
                      {selectedProject.reraNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Total Units</span>
                    <span className="font-bold text-brand-navy">
                      {selectedProject.totalUnits} Units
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Launch Date</span>
                    <span className="font-bold text-brand-navy">
                      {selectedProject.launchDate}
                    </span>
                  </div>
                </div>

                <p className="leading-relaxed font-normal">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="font-bold text-brand-navy mb-2">
                    Township Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.amenities.map((a) => (
                      <span
                        key={a}
                        className="bg-brand-blue-light text-brand-blue px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer onOpenListProperty={() => setIsListPropertyOpen(true)} />
      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
      />
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectProperty={() => {}}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-brand-navy">
          <div className="animate-spin w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full" />
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
