"use client"

import { Calendar, Star, Heart, Users } from "lucide-react"

const PROGRAM = {
  Abril: [
    { date: "04/04/2026", responsible: "Familia Sarango Medina" },
    { date: "11/04/2026", responsible: "Familia Jaramillo Cevallos" },
    { date: "18/04/2026", responsible: "Familia Sinche Jaramillo" },
    { date: "25/04/2026", responsible: "Directora JA", special: true },
  ],
  Mayo: [
    { date: "02/05/2026", responsible: "Familia Alvarado Roa" },
    { date: "09/05/2026", responsible: "Familia Medina Sánchez" },
    { date: "16/05/2026", responsible: "Familia Jumbo Medina" },
    { date: "23/05/2026", responsible: "Directora JA", special: true },
    { date: "30/05/2026", responsible: "Directora JA", special: true },
  ],
  Junio: [
    { date: "06/06/2026", responsible: "Familia Cuenca Álvarez" },
    { date: "13/06/2026", responsible: "Familia Morales Sarango" },
    { date: "20/06/2026", responsible: "Familia Jaramillo Tacuri" },
    { date: "27/06/2026", responsible: "Directora JA", special: true },
  ]
}

const SUPPORT_FAMILIES = [
  "Familia Hna. Rebeca y familia",
  "Familia Ronquillo Jaramillo",
  "Ministerio de JA"
]

export function JaProgram() {
  return (
    <div className="bg-[#EFE6D5] min-h-screen pt-56 px-4 md:px-8 lg:px-16 pb-20">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-800 rounded-full mb-4 shadow-xl shadow-emerald-900/20">
            <Star className="w-10 h-10 text-emerald-100 fill-emerald-100" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-stone-800 tracking-tight">
            ROL DE PROGRAMACIÓN <span className="font-bold text-emerald-800">JA</span>
          </h2>
          <p className="text-stone-500 tracking-[0.2em] uppercase text-sm md:text-base font-medium">
            Abril – Mayo – Junio 2026
          </p>

          <div className="max-w-2xl mx-auto bg-[#FAF7F2] p-6 rounded-2xl border border-[#E3D5C1] shadow-sm mt-8">
            <h3 className="font-medium text-stone-800 mb-2 flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" /> Modalidad: Programa dirigido por familias
            </h3>
            <p className="text-stone-600 text-sm italic">
              El cuarto sábado de cada mes será dirigido por la Directora de Jóvenes.
            </p>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(PROGRAM).map(([month, dates]) => (
            <div key={month} className="bg-[#FAF7F2] rounded-3xl p-6 md:p-8 border border-[#E3D5C1] shadow-sm hover:shadow-md transition-all duration-300 group">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6 uppercase tracking-wider text-center border-b border-[#E3D5C1] pb-4 group-hover:border-emerald-300 transition-colors">
                {month}
              </h3>
              <div className="space-y-4">
                {dates.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white transition-colors duration-200 shadow-sm border border-transparent hover:border-emerald-100">
                    <span className="text-xs tracking-[0.1em] text-stone-400 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </span>
                    <span className={`text-[15px] font-medium leading-tight ${item.special ? 'text-emerald-700' : 'text-stone-700'}`}>
                      {item.responsible}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Families */}
        <div className="bg-stone-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl mt-16 max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400"></div>
          <Heart className="w-8 h-8 mx-auto text-emerald-400 mb-6 fill-emerald-400/20" />
          <h3 className="text-2xl md:text-3xl font-light mb-8 tracking-wide">
            FAMILIAS DE APOYO <br className="md:hidden" />
            <span className="text-emerald-400/80 mx-2 hidden md:inline">/</span>
            PROGRAMAS ESPECIALES
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {SUPPORT_FAMILIES.map((family, index) => (
              <div key={index} className="px-6 py-3 bg-stone-700/50 rounded-full text-stone-200 flex items-center gap-2 text-sm md:text-base tracking-wider font-medium backdrop-blur-sm border border-stone-600/50 hover:bg-emerald-900/40 hover:border-emerald-700/50 transition-all duration-300">
                <Star className="w-3.5 h-3.5 text-emerald-400" />
                {family}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
