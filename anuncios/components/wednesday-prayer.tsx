"use client"

import Image from "next/image"
import { Sparkles, Calendar, Clock } from "lucide-react"
import { Announcement } from "@/lib/sheets"

interface WednesdayPrayerProps {
  data: Announcement | undefined
}

export function WednesdayPrayer({ data }: WednesdayPrayerProps) {
  const wednesdayPrayer: Announcement = data || {
    id: "miercoles",
    type: "miercoles",
    category: "Miércoles de Oración",
    title: "Miércoles de Oración",
    person: "Hna. --------",
    verse: "7-pm",
    reference: "Abre el Hno. Jose Jumbo",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop",
  }

  return (
    <div className="bg-[#EFE6D5] pt-[100px] md:pt-[120px] pb-16 px-4 md:px-8 lg:px-12 flex justify-center">
      <div className="w-full max-w-6xl bg-[#FAF7F2] border border-[#E3D5C1] rounded-[2.5rem] md:rounded-[3rem] shadow-xl p-6 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columna Izquierda */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300 text-emerald-900 bg-emerald-50/60 text-xs md:text-sm font-medium tracking-[0.18em] uppercase">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>MIÉRCOLES DE ORACIÓN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 tracking-tight leading-[1.05]">
              Cultura de Oración y Fe
            </h2>

            <div className="space-y-4">
              <div>
                <span className="text-xs md:text-sm tracking-[0.25em] text-stone-500 uppercase block mb-1 font-medium">
                  Tema Central / Encargado
                </span>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 tracking-wide">
                  {wednesdayPrayer.person}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3D5C1]/70 max-w-xl">
                <div className="flex items-center gap-2 text-stone-600 text-sm md:text-base font-medium mb-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Horario: {wednesdayPrayer.verse}</span>
                </div>
                <p className="text-xs tracking-[0.2em] text-stone-400 uppercase font-medium">
                  — {wednesdayPrayer.reference}
                </p>
              </div>
            </div>

            {/* Tira de Pie de Tarjeta con Avatares */}
            <div className="pt-6 border-t border-[#E3D5C1]/60 flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                  🙏
                </div>
                <div className="inline-block h-8 w-8 rounded-full bg-stone-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                  📖
                </div>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Unidos en la oración y el estudio de la Palabra.
              </p>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[380px] rounded-[2rem] overflow-hidden shadow-md border border-[#E3D5C1]/60 bg-stone-200">
              <Image
                src={wednesdayPrayer.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop"}
                alt="Miércoles de Oración"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
            <span className="text-[11px] tracking-[0.2em] text-stone-400 uppercase font-medium mt-3 text-center">
              Reunión de Oración • Casa de Oración
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}