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
    <div className="bg-[#EFE6D5] min-h-screen w-full relative pt-[52px] flex flex-col lg:flex-row min-h-[calc(100vh-52px)]">
      {/* Columna Izquierda: Información a pantalla completa */}
      <div className="w-full lg:w-[55%] bg-[#EFE6D5] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 min-h-[55vh] lg:min-h-[calc(100vh-52px)]">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300 text-emerald-900 bg-emerald-50/70 text-xs md:text-sm font-medium tracking-[0.18em] uppercase">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>MIÉRCOLES DE ORACIÓN</span>
          </div>
        </div>

        <div className="space-y-6 my-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 tracking-tight leading-[0.95]">
            Cultura de Oración y Fe
          </h2>

          <div className="space-y-4">
            <div>
              <span className="text-xs md:text-sm tracking-[0.25em] text-stone-500 uppercase block mb-1 font-medium">
                Tema Central / Encargado
              </span>
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-emerald-800 tracking-wide">
                {wednesdayPrayer.person}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E3D5C1] max-w-2xl">
              <div className="flex items-center gap-2 text-stone-700 text-base md:text-lg font-medium mb-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                <span>Horario: {wednesdayPrayer.verse}</span>
              </div>
              <p className="text-xs md:text-sm tracking-[0.25em] text-stone-400 uppercase font-medium">
                — {wednesdayPrayer.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Tira de Pie de la Columna Izquierda */}
        <div className="pt-6 border-t border-[#E3D5C1] flex items-center gap-3">
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

      {/* Columna Derecha: Fotografía a Pantalla Completa */}
      <div className="w-full lg:w-[45%] relative min-h-[45vh] lg:min-h-[calc(100vh-52px)] bg-stone-300">
        <Image
          src={wednesdayPrayer.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop"}
          alt="Miércoles de Oración"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent p-6 text-white text-center">
          <p className="text-xs tracking-[0.25em] font-medium uppercase text-stone-200">
            Reunión de Oración • Casa de Oración
          </p>
        </div>
      </div>
    </div>
  )
}