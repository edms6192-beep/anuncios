"use client"

import { useRef } from "react"

const wednesdayPrayer = {
  person: "Ministerio Joven",
  verse: "7:00 PM",
  reference: "Hna. Carolina Sarango",
}

export function WednesdayPrayer() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="bg-[#EFE6D5] pt-[200px] lg:pt-[240px]">
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Full Panel - Text Content */}
        <div className="w-full bg-[#EFE6D5] flex flex-col justify-center p-10 md:p-16 lg:p-20 xl:p-24 min-h-screen">
          {/* Center - Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-stone-800 tracking-tight leading-[0.95] mb-16">
              MIÉRCOLES DE ORACIÓN
            </h2>

            <div className="space-y-12">
              <div>
                <span className="text-xs md:text-sm tracking-[0.3em] text-stone-500 uppercase block mb-6 font-medium">
                  Tema Central
                </span>
                <p className="text-4xl md:text-5xl lg:text-6xl text-emerald-700 font-bold tracking-wide">
                  {wednesdayPrayer.person}
                </p>
              </div>

              <div className="pt-12 border-t border-[#E3D5C1] max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-[#8C8374] leading-relaxed italic mb-6">
                  "{wednesdayPrayer.verse}"
                </p>
                <p className="text-sm md:text-base tracking-[0.25em] text-[#A69C8B] uppercase font-medium">
                  — {wednesdayPrayer.reference}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs tracking-[0.3em] text-stone-400 uppercase font-medium">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-stone-400"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}