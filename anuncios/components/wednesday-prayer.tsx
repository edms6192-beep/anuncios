"use client"

import { useRef } from "react"

const wednesdayPrayer = {
  person: "Hno. Julito Quituisaca",
  verse: "7-pm",
  reference: "Abre la Hna. Wilson Cuenca",
}

export function WednesdayPrayer() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="bg-[#1a1a1a] pt-40">
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Full Panel - Text Content */}
        <div className="w-full bg-[#1a1a1a] flex flex-col justify-center p-10 md:p-16 lg:p-20 xl:p-24 min-h-screen">
          {/* Center - Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#f5f5f0] tracking-tight leading-[0.95] mb-16">
              MIÉRCOLES DE ORACIÓN
            </h2>

            <div className="space-y-12">
              <div>
                <span className="text-xs md:text-sm tracking-[0.3em] text-[#666] uppercase block mb-6">
                  Tema Central
                </span>
                <p className="text-3xl md:text-4xl lg:text-5xl text-[#f5f5f0]/90 font-light">
                  {wednesdayPrayer.person}
                </p>
              </div>

              <div className="pt-12 border-t border-[#333] max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-[#999] leading-relaxed italic mb-6">
                  "{wednesdayPrayer.verse}"
                </p>
                <p className="text-sm md:text-base tracking-[0.25em] text-[#666] uppercase">
                  — {wednesdayPrayer.reference}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs tracking-[0.3em] text-[#555] uppercase">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#555]"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}