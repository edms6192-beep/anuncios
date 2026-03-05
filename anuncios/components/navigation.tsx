"use client"

type Tab = "anuncios" | "eventos"
type SubTab = "esta-semana" | "proxima-semana" | "miercoles-oracion" | "proximos-eventos" | "historial"

interface NavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  activeSubTab: SubTab
  onSubTabChange: (subTab: SubTab) => void
}

export function Navigation({ activeTab, onTabChange, activeSubTab, onSubTabChange }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EFE6D5]/90 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center pt-6 pb-4">
        {/* Navegación principal */}
        <div className="flex items-center gap-1 text-sm tracking-[0.15em]">
          <button
            onClick={() => onTabChange("anuncios")}
            className={`px-4 py-2 transition-all duration-300 uppercase font-medium ${activeTab === "anuncios" ? "text-stone-800" : "text-stone-400 hover:text-stone-600"
              }`}
          >
            Anuncios
          </button>

          <span className="text-stone-300">|</span>

          <button
            onClick={() => onTabChange("eventos")}
            className={`px-4 py-2 transition-all duration-300 uppercase font-medium ${activeTab === "eventos" ? "text-stone-800" : "text-stone-400 hover:text-stone-600"
              }`}
          >
            Eventos
          </button>
        </div>

        {/* Sub navegación para anuncios */}
        {activeTab === "anuncios" && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <button
              onClick={() => onSubTabChange("esta-semana")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${activeSubTab === "esta-semana"
                ? "text-white bg-emerald-700 border-emerald-700 font-medium"
                : "text-stone-500 border-stone-200 hover:text-stone-700 hover:border-stone-300"
                }`}
            >
              Esta semana
            </button>

            <button
              onClick={() => onSubTabChange("proxima-semana")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${activeSubTab === "proxima-semana"
                ? "text-white bg-emerald-700 border-emerald-700 font-medium"
                : "text-stone-500 border-stone-200 hover:text-stone-700 hover:border-stone-300"
                }`}
            >
              Próxima semana
            </button>

            <button
              onClick={() => onSubTabChange("miercoles-oracion")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${activeSubTab === "miercoles-oracion"
                ? "text-white bg-emerald-700 border-emerald-700 font-medium"
                : "text-stone-500 border-stone-200 hover:text-stone-700 hover:border-stone-300"
                }`}
            >
              Miércoles de Oración
            </button>
          </div>
        )}

        {/* Sub navegación para eventos */}
        {activeTab === "eventos" && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <button
              onClick={() => onSubTabChange("proximos-eventos")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${activeSubTab === "proximos-eventos"
                ? "text-white bg-emerald-700 border-emerald-700 font-medium"
                : "text-stone-500 border-stone-200 hover:text-stone-700 hover:border-stone-300"
                }`}
            >
              Eventos
            </button>

            <button
              onClick={() => onSubTabChange("historial")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${activeSubTab === "historial"
                ? "text-white bg-emerald-700 border-emerald-700 font-medium"
                : "text-stone-500 border-stone-200 hover:text-stone-700 hover:border-stone-300"
                }`}
            >
              Historial de eventos
            </button>
          </div>
        )}

        <div className="mt-6 px-6 py-2 border border-[#E3D5C1] rounded-full bg-[#FAF7F2] shadow-sm">
          <p className="text-xs md:text-sm tracking-[0.3em] text-stone-500 uppercase font-medium">
            {activeTab === "anuncios" ? (
              activeSubTab === "esta-semana"
                ? "Para este Sabado 7 de Marzo del 2026 Nos ayudaran:"
                : activeSubTab === "proxima-semana"
                  ? "Anuncios Para el Sábado 7 de Marzo del 2026"
                  : "Miércoles de Oración - 11 de Marzo del 2026"
            ) : (
              activeSubTab === "proximos-eventos"
                ? "Próximos eventos especiales"
                : "Historial de eventos pasados"
            )}
          </p>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#E3D5C1] to-transparent" />
    </nav>
  )
}
