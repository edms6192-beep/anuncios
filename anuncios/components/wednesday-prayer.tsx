"use client"

import Image from "next/image"
import { Sparkles, Clock } from "lucide-react"
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
    <div className="bg-[#0B2519] text-white min-h-screen w-full relative pt-[52px] flex flex-col lg:flex-row min-h-[calc(100vh-52px)] items-center px-6 sm:px-10 lg:px-16 py-8">
      {/* Columna Izquierda: Información */}
      <div className="w-full lg:w-[50%] flex flex-col justify-between space-y-8 pr-0 lg:pr-8 min-h-[50vh] lg:min-h-[calc(100vh-120px)]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>MIÉRCOLES DE ORACIÓN</span>
          </div>
        </div>

        <div className="space-y-6 my-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.05] font-brunson">
            Cultura de Oración y Fe
          </h2>

          <div className="space-y-4">
            <div>
              <span className="text-xs sm:text-sm md:text-base tracking-[0.3em] text-emerald-300 uppercase block mb-2 font-bold">
                Tema Central / Encargado
              </span>
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-emerald-400 drop-shadow-sm">
                {wednesdayPrayer.person}
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 max-w-xl">
              <div className="flex items-center gap-2 text-stone-200 text-base md:text-lg font-medium mb-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>Horario: {wednesdayPrayer.verse}</span>
              </div>
              <p className="text-xs md:text-sm tracking-[0.25em] text-stone-400 uppercase font-medium">
                — {wednesdayPrayer.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Tira del Pie de Columna */}
        <div className="pt-6 border-t border-white/15 flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-8 w-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#0B2519]">
              🙏
            </div>
            <div className="inline-block h-8 w-8 rounded-full bg-stone-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#0B2519]">
              📖
            </div>
          </div>
          <p className="text-xs text-stone-300 font-normal">
            Unidos en la oración y el estudio de la Palabra.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Fotografía Enmarcada */}
      <div className="w-full lg:w-[50%] flex flex-col items-center justify-center pt-8 lg:pt-0">
        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px] xl:h-[540px] rounded-2xl lg:rounded-[28px] overflow-hidden shadow-2xl border border-white/15 bg-stone-900">
          <Image
            src={wednesdayPrayer.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop"}
            alt="Miércoles de Oración"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <span className="text-[11px] tracking-[0.25em] text-stone-400 uppercase font-medium mt-3 text-center">
          Reunión de Oración • Casa de Oración
        </span>
      </div>
    </div>
  )
}