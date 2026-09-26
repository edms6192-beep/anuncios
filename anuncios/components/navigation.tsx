"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight, Calendar, Bookmark, Clock } from "lucide-react"

type Tab = "anuncios" | "eventos" | "ja"
type SubTab = "esta-semana" | "proxima-semana" | "miercoles-oracion" | "proximos-eventos" | "historial"

interface NavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  activeSubTab: SubTab
  onSubTabChange: (subTab: SubTab) => void
  thisWeekTitle: string
  nextWeekTitle: string
  wednesdayTitle: string
}

export function Navigation({
  activeTab,
  onTabChange,
  activeSubTab,
  onSubTabChange,
  thisWeekTitle,
  nextWeekTitle,
  wednesdayTitle,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTabSelect = (tab: Tab, defaultSubTab?: SubTab) => {
    onTabChange(tab)
    if (defaultSubTab) {
      onSubTabChange(defaultSubTab)
    }
  }

  const handleSubTabSelect = (subTab: SubTab) => {
    onSubTabChange(subTab)
    setIsOpen(false)
  }

  const getSubTabLabel = (sub: SubTab) => {
    switch (sub) {
      case "esta-semana":
        return "Esta semana"
      case "proxima-semana":
        return "Próxima semana"
      case "miercoles-oracion":
        return "Miércoles de Oración"
      case "proximos-eventos":
        return "Próximos eventos"
      case "historial":
        return "Historial de eventos"
      default:
        return ""
    }
  }

  const getActiveTitle = () => {
    if (activeTab === "anuncios") {
      if (activeSubTab === "esta-semana") return thisWeekTitle
      if (activeSubTab === "proxima-semana") return nextWeekTitle
      return wednesdayTitle
    }
    if (activeTab === "eventos") {
      if (activeSubTab === "proximos-eventos") return "Próximos eventos especiales"
      return "Historial de eventos pasados"
    }
    return "Rol de Programación JA"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B2519]/90 backdrop-blur-md border-b border-white/10 shadow-md transition-all">
      {/* Barra Header Principal */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between">
        {/* Lado Izquierdo: Botón Menú sin burbuja alineado al extremo + Badge */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-white hover:text-emerald-300 transition-colors flex items-center gap-2 group cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <Menu className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
            )}
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-white">
              MENÚ
            </span>
          </button>

          {/* Badge Sección Activa */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-emerald-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
              {activeTab === "anuncios"
                ? `ANUNCIOS • ${getSubTabLabel(activeSubTab).toUpperCase()}`
                : activeTab === "eventos"
                ? `EVENTOS • ${getSubTabLabel(activeSubTab).toUpperCase()}`
                : "PROGRAMA JA"}
            </span>
          </div>
        </div>

        {/* Lado Derecho: Título / Fecha en pantallas medianas/grandes */}
        <div className="hidden lg:block max-w-md truncate text-right">
          <p className="text-xs tracking-[0.2em] text-stone-300 uppercase font-medium truncate">
            {getActiveTitle()}
          </p>
        </div>
      </div>

      {/* Menú Hamburguesa Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[52px] bg-black/50 backdrop-blur-xs z-40"
            />

            {/* Panel Desplegable del Menú en Verde Oscuro */}
            <motion.div
              initial={{ opacity: 0, y: -15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -15, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative z-50 bg-[#0D2E1F] border-b border-white/15 shadow-2xl text-white overflow-hidden"
            >
              <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna 1: Pestaña Anuncios y Sub-pestañas */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleTabSelect("anuncios", "esta-semana")}
                    className={`w-full text-left font-bold text-sm tracking-[0.2em] uppercase pb-2 border-b flex items-center justify-between ${
                      activeTab === "anuncios"
                        ? "text-emerald-300 border-emerald-400"
                        : "text-stone-400 border-white/10 hover:text-stone-200"
                    }`}
                  >
                    <span>1. ANUNCIOS</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="space-y-2 pl-2">
                    <button
                      onClick={() => {
                        handleTabSelect("anuncios")
                        handleSubTabSelect("esta-semana")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === "anuncios" && activeSubTab === "esta-semana"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Esta semana
                    </button>

                    <button
                      onClick={() => {
                        handleTabSelect("anuncios")
                        handleSubTabSelect("proxima-semana")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === "anuncios" && activeSubTab === "proxima-semana"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Próxima semana
                    </button>

                    <button
                      onClick={() => {
                        handleTabSelect("anuncios")
                        handleSubTabSelect("miercoles-oracion")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === "anuncios" && activeSubTab === "miercoles-oracion"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Miércoles de Oración
                    </button>
                  </div>
                </div>

                {/* Columna 2: Pestaña Eventos y Sub-pestañas */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleTabSelect("eventos", "proximos-eventos")}
                    className={`w-full text-left font-bold text-sm tracking-[0.2em] uppercase pb-2 border-b flex items-center justify-between ${
                      activeTab === "eventos"
                        ? "text-emerald-300 border-emerald-400"
                        : "text-stone-400 border-white/10 hover:text-stone-200"
                    }`}
                  >
                    <span>2. EVENTOS</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="space-y-2 pl-2">
                    <button
                      onClick={() => {
                        handleTabSelect("eventos")
                        handleSubTabSelect("proximos-eventos")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === "eventos" && activeSubTab === "proximos-eventos"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Próximos eventos
                    </button>

                    <button
                      onClick={() => {
                        handleTabSelect("eventos")
                        handleSubTabSelect("historial")
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === "eventos" && activeSubTab === "historial"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Historial de eventos
                    </button>
                  </div>
                </div>

                {/* Columna 3: Pestaña JA */}
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      handleTabSelect("ja")
                      setIsOpen(false)
                    }}
                    className={`w-full text-left font-bold text-sm tracking-[0.2em] uppercase pb-2 border-b flex items-center justify-between ${
                      activeTab === "ja"
                        ? "text-emerald-300 border-emerald-400"
                        : "text-stone-400 border-white/10 hover:text-stone-200"
                    }`}
                  >
                    <span>3. PROGRAMA JA</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="pl-2 pt-2">
                    <button
                      onClick={() => {
                        handleTabSelect("ja")
                        setIsOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === "ja"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      Rol de Programación JA
                    </button>
                  </div>
                </div>
              </div>

              {/* Pie de Menú con Título */}
              <div className="bg-[#081E14] border-t border-white/10 px-6 py-3 text-center">
                <p className="text-xs tracking-[0.25em] text-stone-300 uppercase font-medium">
                  {getActiveTitle()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
