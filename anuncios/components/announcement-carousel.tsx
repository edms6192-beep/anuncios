"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  HandHeart,
  Sparkles,
  Coins,
  Baby,
  Calculator,
  DoorOpen,
  Flower2,
  ClipboardList,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Share2
} from "lucide-react"

import { Announcement } from "@/lib/sheets"

interface AnnouncementCarouselProps {
  announcements: Announcement[]
  weekLabel?: string
}

export function AnnouncementCarousel({
  announcements,
  weekLabel = "Esta Semana"
}: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [copied, setCopied] = useState(false)

  const total = announcements.length

  const handleNext = useCallback(() => {
    if (total === 0) return
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    if (total === 0) return
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev])

  const handleCopyToWhatsApp = () => {
    let textToCopy = `📋 *RESUMEN DE PRIVILEGIOS - ${weekLabel.toUpperCase()}* 📋\n\n`

    announcements.forEach((item) => {
      textToCopy += `🔹 *${item.category}*:\n`
      if (item.category === "Sermón") {
        textToCopy += `   • ${item.person}\n`
        if (item.companions && item.companions.length > 0) {
          item.companions.forEach((c) => (textToCopy += `   • ${c}\n`))
        }
      } else if (item.persons && item.persons.length > 0) {
        textToCopy += `   • ${item.persons.join(", ")}\n`
      } else {
        textToCopy += `   • ${item.person}\n`
      }
      textToCopy += "\n"
    })

    textToCopy += "🙏 ¡Que Dios bendiga su ministerio!"

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sermón":
        return "text-indigo-900"
      case "Limpieza":
      case "Apertura del Templo":
        return "text-emerald-900"
      case "Flores":
        return "text-rose-900"
      case "Diezmos y Ofrendas":
      case "Ofrendas de Niños":
      case "Conteo de Diezmo":
        return "text-amber-900"
      default:
        return "text-stone-800"
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Sermón":
        return "border-indigo-300 text-indigo-900 bg-indigo-50/70"
      case "Limpieza":
      case "Apertura del Templo":
        return "border-emerald-300 text-emerald-900 bg-emerald-50/70"
      case "Flores":
        return "border-rose-300 text-rose-900 bg-rose-50/70"
      case "Diezmos y Ofrendas":
      case "Ofrendas de Niños":
      case "Conteo de Diezmo":
        return "border-amber-300 text-amber-900 bg-amber-50/70"
      default:
        return "border-stone-300 text-stone-800 bg-white/70"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sermón":
        return <BookOpen className={`w-4 h-4 ${getCategoryColor(category)}`} />
      case "Limpieza":
        return <Sparkles className={`w-4 h-4 ${getCategoryColor(category)}`} />
      case "Flores":
        return <Flower2 className={`w-4 h-4 ${getCategoryColor(category)}`} />
      case "Diezmos y Ofrendas":
        return <Coins className={`w-4 h-4 ${getCategoryColor(category)}`} />
      case "Ofrendas de Niños":
        return <Baby className={`w-4 h-4 ${getCategoryColor(category)}`} />
      case "Conteo de Diezmo":
        return <Calculator className={`w-4 h-4 ${getCategoryColor(category)}`} />
      case "Apertura del Templo":
        return <DoorOpen className={`w-4 h-4 ${getCategoryColor(category)}`} />
      default:
        return <HandHeart className={`w-4 h-4 ${getCategoryColor(category)}`} />
    }
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="pt-[140px] pb-16 px-4 text-center text-stone-500 min-h-screen bg-[#EFE6D5] flex items-center justify-center">
        No hay anuncios registrados para esta sección.
      </div>
    )
  }

  const currentItem = announcements[currentIndex]

  // Variantes para animación a pantalla completa
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0
    })
  }

  return (
    <div className="bg-[#EFE6D5] min-h-screen w-full relative pt-[52px] flex flex-col justify-between overflow-x-hidden">
      {/* Carrusel a Pantalla Completa (Full Screen - Sin caja ni tarjeta contenida) */}
      <div className="w-full flex-1 relative flex flex-col">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentItem.id || currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) handleNext()
              if (info.offset.x > 70) handlePrev()
            }}
            className="w-full flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-52px)]"
          >
            {/* Columna Izquierda: Información de Anuncio ocupando toda la pantalla */}
            <div className="w-full lg:w-[55%] bg-[#EFE6D5] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 min-h-[55vh] lg:min-h-[calc(100vh-52px)]">
              {/* Barra Superior con Insignia, Contador y Botón de Resumen */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs md:text-sm font-medium tracking-[0.18em] uppercase ${getCategoryBadgeColor(
                      currentItem.category
                    )}`}
                  >
                    {getCategoryIcon(currentItem.category)}
                    <span>{currentItem.category || "ANUNCIO"}</span>
                  </div>

                  <span className="text-xs tracking-[0.2em] text-stone-400 font-semibold uppercase">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                <button
                  onClick={() => setShowSummary(true)}
                  className="px-4 py-2 bg-white/80 border border-[#E3D5C1] rounded-2xl text-xs font-bold tracking-[0.15em] text-stone-800 uppercase hover:bg-white transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <ClipboardList className="w-4 h-4 text-emerald-700" />
                  <span>Ver Resumen</span>
                </button>
              </div>

              {/* Centro: Título, Persona, Versículo y Botones */}
              <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8 my-4">
                {/* Título Principal */}
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 tracking-tight leading-[0.95]">
                  {currentItem.title}
                </h2>

                {/* Encargado / Personas */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs md:text-sm tracking-[0.25em] text-stone-500 uppercase block mb-1.5 font-medium">
                      {currentItem.personLabel || "Encargado(a)"}
                    </span>
                    {currentItem.category === "Sermón" ? (
                      <div className="space-y-3">
                        <p
                          className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide ${getCategoryColor(
                            currentItem.category
                          )}`}
                        >
                          {currentItem.person}
                        </p>
                        {currentItem.companions && currentItem.companions.length > 0 && (
                          <div className="pt-2">
                            <span className="text-xs tracking-[0.2em] text-stone-400 uppercase block mb-1 font-medium">
                              Acompañantes
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {currentItem.companions.map((comp, i) => (
                                <span
                                  key={i}
                                  className="px-3.5 py-1 bg-white/80 border border-[#E3D5C1] rounded-full text-xs md:text-sm font-semibold text-stone-700 shadow-xs"
                                >
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : currentItem.persons && currentItem.persons.length > 0 ? (
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {currentItem.persons.map((person, i) => (
                          <p
                            key={i}
                            className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${getCategoryColor(
                              currentItem.category
                            )}`}
                          >
                            {person}
                            {i < currentItem.persons!.length - 1 ? "," : ""}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p
                        className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide ${getCategoryColor(
                          currentItem.category
                        )}`}
                      >
                        {Array.isArray(currentItem.person)
                          ? currentItem.person.join(", ")
                          : currentItem.person || "Por asignar"}
                      </p>
                    )}
                  </div>

                  {/* Versículo / Cita Bíblica */}
                  {currentItem.verse && (
                    <div className="pt-6 border-t border-[#E3D5C1] max-w-2xl">
                      <p className="text-stone-600 italic text-base md:text-lg leading-relaxed">
                        "{currentItem.verse}"
                      </p>
                      {currentItem.reference && (
                        <p className="text-xs md:text-sm tracking-[0.25em] text-stone-400 mt-2 uppercase font-medium">
                          — {currentItem.reference}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Controles de Navegación del Carrusel (Flechas + Compartir) */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={handlePrev}
                    className="p-3.5 bg-white border border-[#E3D5C1] rounded-full text-stone-700 hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
                    aria-label="Anuncio Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3.5 bg-white border border-[#E3D5C1] rounded-full text-stone-700 hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
                    aria-label="Anuncio Siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleCopyToWhatsApp}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs md:text-sm font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-sm transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Compartir ↗
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tira de Pie de la Columna Izquierda con Avatares */}
              <div className="pt-6 border-t border-[#E3D5C1] flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                    JA
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                    IASD
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                    ✝
                  </div>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Guiamos cada servicio con dedicación y fe.
                </p>
              </div>
            </div>

            {/* Columna Derecha: Fotografía a Pantalla Completa (Full Bleed Image) */}
            <div className="w-full lg:w-[45%] relative min-h-[45vh] lg:min-h-[calc(100vh-52px)] bg-stone-300">
              <Image
                src={currentItem.image || "/placeholder.svg"}
                alt={currentItem.title || "Anuncio"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent p-6 text-white text-center">
                <p className="text-xs tracking-[0.25em] font-medium uppercase text-stone-200">
                  Tu Fe, Nuestra Misión • IASD
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores de Puntos (Dots) Flotantes al Pie de Pantalla */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#E3D5C1] shadow-sm">
        {announcements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? "w-7 bg-emerald-700"
                : "w-2.5 bg-[#E3D5C1] hover:bg-stone-500"
            }`}
            aria-label={`Ir a diapositiva ${idx + 1}`}
          />
        ))}
      </div>

      {/* Modal de Resumen Completo */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowSummary(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] border border-[#E3D5C1] rounded-[2rem] shadow-2xl p-6 md:p-12 relative"
            >
              <button
                onClick={() => setShowSummary(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
                aria-label="Cerrar resumen"
              >
                <X className="w-6 h-6 text-stone-500" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#E3D5C1] gap-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-light text-stone-800 tracking-tight flex items-center gap-3">
                    <ClipboardList className="w-8 h-8 text-emerald-700" />
                    Resumen de Privilegios
                  </h2>
                  <p className="text-stone-500 mt-2 text-sm tracking-wide">{weekLabel}</p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCopyToWhatsApp}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-emerald-700 border border-[#E3D5C1] hover:bg-emerald-50"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar para WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {announcements.map((item) => (
                  <div
                    key={`summary-${item.id}`}
                    className="flex items-start gap-4 p-3.5 rounded-xl bg-white/70 border border-[#E3D5C1]/70"
                  >
                    <div className="p-2.5 bg-white border border-[#E3D5C1] rounded-lg shadow-sm">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="text-xs tracking-wider text-stone-500 uppercase font-medium mb-1">
                        {item.category}
                      </h3>
                      <p className={`text-base font-bold tracking-wide ${getCategoryColor(item.category)}`}>
                        {item.category === "Sermón"
                          ? item.person
                          : item.persons && item.persons.length > 0
                          ? item.persons.join(", ")
                          : Array.isArray(item.person)
                          ? item.person.join(", ")
                          : item.person}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
