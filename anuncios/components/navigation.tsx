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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EFE6D5]/95 backdrop-blur-md border-b border-[#E3D5C1]/80 shadow-xs transition-all">
      {/* Barra Header Principal alineada directamente a los extremos */}
      <div className="w-full px-3 sm:px-4 md:px-6 py-2.5 flex items-center justify-between">
        {/* Lado Izquierdo: Botón Menú sin burbuja alineado a la esquina + Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-stone-800 hover:text-stone-900 transition-colors flex items-center gap-2 group cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-stone-800 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <Menu className="w-6 h-6 text-stone-800 transition-transform duration-300 group-hover:scale-110" />
            )}
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-stone-800">
              MENÚ
            </span>
          </button>

          {/* Badge Sección Activa */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-stone-700 bg-white/50 border border-[#E3D5C1] px-2.5 py-1 rounded-full">
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
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase font-medium truncate">
            {getActiveTitle()}
          </p>
        </div>
      </div>

      {/* Menú Hamburguesa Desplegable (Overlay & Content) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo oscuro traslúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[52px] bg-stone-900/30 backdrop-blur-xs z-40"
            />

            {/* Panel Desplegable del Menú */}
            <motion.div
              initial={{ opacity: 0, y: -15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -15, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative z-50 bg-[#FAF7F2] border-b border-[#E3D5C1] shadow-xl overflow-hidden"
            >
              <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna 1: Pestaña Anuncios y Sub-pestañas */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleTabSelect("anuncios", "esta-semana")}
                    className={`w-full text-left font-bold text-sm tracking-[0.2em] uppercase pb-2 border-b flex items-center justify-between ${
                      activeTab === "anuncios"
                        ? "text-emerald-800 border-emerald-600"
                        : "text-stone-400 border-stone-200 hover:text-stone-700"
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
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-stone-600 hover:bg-stone-200/60"
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
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-stone-600 hover:bg-stone-200/60"
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
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-stone-600 hover:bg-stone-200/60"
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
                        ? "text-emerald-800 border-emerald-600"
                        : "text-stone-400 border-stone-200 hover:text-stone-700"
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
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-stone-600 hover:bg-stone-200/60"
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
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-stone-600 hover:bg-stone-200/60"
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
                        ? "text-emerald-800 border-emerald-600"
                        : "text-stone-400 border-stone-200 hover:text-stone-700"
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
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "text-stone-600 hover:bg-stone-200/60"
                      }`}
                    >
                      Rol de Programación JA
                    </button>
                  </div>
                </div>
              </div>

              {/* Pie de Menú con Título de la semana */}
              <div className="bg-[#EFE6D5]/60 border-t border-[#E3D5C1] px-6 py-3 text-center">
                <p className="text-xs tracking-[0.25em] text-stone-500 uppercase font-medium">
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
