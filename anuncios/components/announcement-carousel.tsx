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
        return "border-indigo-300 text-indigo-900 bg-indigo-50/60"
      case "Limpieza":
      case "Apertura del Templo":
        return "border-emerald-300 text-emerald-900 bg-emerald-50/60"
      case "Flores":
        return "border-rose-300 text-rose-900 bg-rose-50/60"
      case "Diezmos y Ofrendas":
      case "Ofrendas de Niños":
      case "Conteo de Diezmo":
        return "border-amber-300 text-amber-900 bg-amber-50/60"
      default:
        return "border-stone-300 text-stone-800 bg-white/60"
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
      <div className="pt-[280px] md:pt-[240px] pb-16 px-4 text-center text-stone-500">
        No hay anuncios registrados para esta sección.
      </div>
    )
  }

  const currentItem = announcements[currentIndex]

  // Variantes para las transiciones del carrusel
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96
    })
  }

  return (
    <div className="bg-[#EFE6D5] pt-[280px] md:pt-[240px] pb-16 px-4 md:px-8 lg:px-12 flex flex-col items-center">
      {/* Botón Superior para ver resumen general */}
      <div className="w-full max-w-6xl mb-6 flex items-center justify-between">
        <button
          onClick={() => setShowSummary(true)}
          className="group relative px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#E3D5C1] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2.5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          <ClipboardList className="w-4 h-4 text-emerald-700 relative z-10" />
          <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-stone-800 uppercase relative z-10">
            Ver Resumen
          </span>
        </button>

        {/* Indicador de posición del carrusel */}
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-[#E3D5C1] px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-stone-600">
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-stone-300">/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Tarjeta Principal del Carrusel (Estilo exacto de la imagen) */}
      <div className="w-full max-w-6xl relative min-h-[580px] md:min-h-[540px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentItem.id || currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) handleNext()
              if (info.offset.x > 60) handlePrev()
            }}
            className="bg-[#FAF7F2] border border-[#E3D5C1] rounded-[2.5rem] md:rounded-[3rem] shadow-xl p-6 md:p-10 lg:p-12 flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Columna Izquierda: Información del Anuncio */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* Insignia Píldora Superior */}
                <div>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs md:text-sm font-medium tracking-[0.18em] uppercase ${getCategoryBadgeColor(
                      currentItem.category
                    )}`}
                  >
                    {getCategoryIcon(currentItem.category)}
                    <span>{currentItem.category || "ANUNCIO"}</span>
                  </div>
                </div>

                {/* Título Principal */}
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 tracking-tight leading-[1.05]">
                    {currentItem.title}
                  </h2>
                </div>

                {/* Personas / Encargados */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs md:text-sm tracking-[0.25em] text-stone-500 uppercase block mb-1 font-medium">
                      {currentItem.personLabel || "Encargado(a)"}
                    </span>
                    {currentItem.category === "Sermón" ? (
                      <div className="space-y-2">
                        <p
                          className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${getCategoryColor(
                            currentItem.category
                          )}`}
                        >
                          {currentItem.person}
                        </p>
                        {currentItem.companions && currentItem.companions.length > 0 && (
                          <div className="pt-2">
                            <span className="text-xs tracking-[0.2em] text-stone-400 uppercase block mb-1">
                              Acompañantes
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {currentItem.companions.map((comp, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white border border-[#E3D5C1] rounded-full text-sm font-semibold text-stone-700"
                                >
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : currentItem.persons && currentItem.persons.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {currentItem.persons.map((person, i) => (
                          <p
                            key={i}
                            className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-wide ${getCategoryColor(
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
                        className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${getCategoryColor(
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
                    <div className="pt-4 border-t border-[#E3D5C1]/70 max-w-xl">
                      <p className="text-stone-600 italic text-sm md:text-base leading-relaxed">
                        "{currentItem.verse}"
                      </p>
                      {currentItem.reference && (
                        <p className="text-xs tracking-[0.2em] text-stone-400 mt-2 uppercase font-medium">
                          — {currentItem.reference}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Botones de Acción en formato Píldora */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 bg-white border border-[#E3D5C1] rounded-full text-stone-700 hover:bg-stone-100 transition-colors shadow-sm"
                    aria-label="Anuncio Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 bg-white border border-[#E3D5C1] rounded-full text-stone-700 hover:bg-stone-100 transition-colors shadow-sm"
                    aria-label="Anuncio Siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleCopyToWhatsApp}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center gap-2 shadow-sm transition-all"
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

                {/* Tira de Pie de Tarjeta con Avatares */}
                <div className="pt-6 border-t border-[#E3D5C1]/60 flex items-center gap-3">
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

              {/* Columna Derecha: Fotografía Enmarcada */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[400px] rounded-[2rem] overflow-hidden shadow-md border border-[#E3D5C1]/60 bg-stone-200">
                  <Image
                    src={currentItem.image || "/placeholder.svg"}
                    alt={currentItem.title || "Anuncio"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
                <span className="text-[11px] tracking-[0.2em] text-stone-400 uppercase font-medium mt-3 text-center">
                  Tu Fe, Nuestra Misión • IASD
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores de Puntos (Dots) del Carrusel abajo de la tarjeta */}
      <div className="flex items-center gap-2 mt-8">
        {announcements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`h-2.5 transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-8 bg-emerald-700"
                : "w-2.5 bg-[#E3D5C1] hover:bg-stone-400"
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
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 transition-colors"
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
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm ${
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
