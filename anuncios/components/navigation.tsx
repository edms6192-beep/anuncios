"use client"

type Tab = "anuncios" | "eventos"
type SubTab = "esta-semana" | "proxima-semana"

interface NavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  activeSubTab: SubTab
  onSubTabChange: (subTab: SubTab) => void
}

export function Navigation({ activeTab, onTabChange, activeSubTab, onSubTabChange }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]">
      <div className="flex flex-col items-center justify-center pt-6 pb-4">
        {/* Navegación principal */}
        <div className="flex items-center gap-1 text-sm tracking-[0.15em]">
          <button
            onClick={() => onTabChange("anuncios")}
            className={`px-4 py-2 transition-all duration-300 uppercase ${
              activeTab === "anuncios" ? "text-[#f5f5f0]" : "text-[#666] hover:text-[#999]"
            }`}
          >
            Anuncios
          </button>

          <span className="text-[#444]">|</span>

          <button
            onClick={() => onTabChange("eventos")}
            className={`px-4 py-2 transition-all duration-300 uppercase ${
              activeTab === "eventos" ? "text-[#f5f5f0]" : "text-[#666] hover:text-[#999]"
            }`}
          >
            Eventos
          </button>
        </div>

        {/* Sub navegación para anuncios */}
        {activeTab === "anuncios" && (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => onSubTabChange("esta-semana")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${
                activeSubTab === "esta-semana"
                  ? "text-[#1a1a1a] bg-[#f5f5f0] border-[#f5f5f0]"
                  : "text-[#666] border-[#333] hover:text-[#999] hover:border-[#555]"
              }`}
            >
              Esta semana
            </button>

            <button
              onClick={() => onSubTabChange("proxima-semana")}
              className={`px-4 py-2 text-xs tracking-[0.2em] transition-all duration-300 rounded-full border ${
                activeSubTab === "proxima-semana"
                  ? "text-[#1a1a1a] bg-[#f5f5f0] border-[#f5f5f0]"
                  : "text-[#666] border-[#333] hover:text-[#999] hover:border-[#555]"
              }`}
            >
              Próxima semana
            </button>
          </div>
        )}

        {activeTab === "anuncios" && (
          <div className="mt-4 px-6 py-2 border border-[#333] rounded-full">
            <p className="text-xs md:text-sm tracking-[0.3em] text-[#888] uppercase">
              {activeSubTab === "esta-semana" ? "Para este Sabado 10 de Enero del 2026 Nos ayudaran:" : "Anuncios Para elSábado 17 de Enero del 2026"}
            </p>
          </div>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />
    </nav>
  )
}
