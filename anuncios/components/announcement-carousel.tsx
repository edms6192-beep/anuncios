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
  Share2,
  Play,
  Pause
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
  const [isPaused, setIsPaused] = useState(false)

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

  // Reproducción Automática de 5 Segundos (5000ms)
  useEffect(() => {
    if (isPaused || total <= 1 || showSummary) return

    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [handleNext, isPaused, total, showSummary])

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sermón":
        return <BookOpen className="w-4 h-4 text-emerald-300" />
      case "Limpieza":
        return <Sparkles className="w-4 h-4 text-emerald-300" />
      case "Flores":
        return <Flower2 className="w-4 h-4 text-emerald-300" />
      case "Diezmos y Ofrendas":
        return <Coins className="w-4 h-4 text-emerald-300" />
      case "Ofrendas de Niños":
        return <Baby className="w-4 h-4 text-emerald-300" />
      case "Conteo de Diezmo":
        return <Calculator className="w-4 h-4 text-emerald-300" />
      case "Apertura del Templo":
        return <DoorOpen className="w-4 h-4 text-emerald-300" />
      default:
        return <HandHeart className="w-4 h-4 text-emerald-300" />
    }
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="pt-[140px] pb-16 px-4 text-center text-stone-400 min-h-screen bg-[#0B2519] flex items-center justify-center">
        No hay anuncios registrados para esta sección.
      </div>
    )
  }

  const currentItem = announcements[currentIndex]

  // Variantes para Transición Bonita y Fluida (Slide + Scale + Fade)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "80%" : "-80%",
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "80%" : "-80%",
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)"
    })
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-[#0B2519] text-white min-h-screen w-full relative pt-[52px] flex flex-col justify-between overflow-x-hidden"
    >
      {/* Barra de Progreso de 5 Segundos en la parte superior */}
      <div className="absolute top-[52px] left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
        {!isPaused && (
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-emerald-400"
          />
        )}
      </div>

      {/* Carrusel a Pantalla Completa con Transición Bonita */}
      <div className="w-full flex-1 relative flex flex-col">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentItem.id || currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) handleNext()
              if (info.offset.x > 70) handlePrev()
            }}
            className="w-full flex-1 flex flex-col lg:flex-row items-center min-h-[calc(100vh-52px)] px-6 sm:px-10 lg:px-16 py-8"
          >
            {/* Columna Izquierda: Información del Anuncio */}
            <div className="w-full lg:w-[50%] flex flex-col justify-between space-y-8 pr-0 lg:pr-8 min-h-[50vh] lg:min-h-[calc(100vh-120px)]">
              {/* Barra de Encabezado Superior */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-emerald-300">
                    {getCategoryIcon(currentItem.category)}
                    <span>{currentItem.category || "ANUNCIO"}</span>
                  </div>

                  <span className="text-xs tracking-[0.2em] text-stone-400 font-semibold uppercase">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Indicador Play/Pause */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                    title={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
                    aria-label={isPaused ? "Reanudar" : "Pausar"}
                  >
                    {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setShowSummary(true)}
                    className="text-xs font-semibold tracking-[0.15em] text-white hover:text-emerald-300 uppercase transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ClipboardList className="w-4 h-4 text-emerald-400" />
                    <span>Ver Resumen</span>
                  </button>
                </div>
              </div>

              {/* Centro: Título, Persona, Versículo y Botones */}
              <div className="flex-1 flex flex-col justify-center space-y-6 my-auto">
                {/* Título Principal */}
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-normal text-white tracking-[0.06em] leading-[0.95] mb-8 md:mb-12 font-brunson uppercase">
                  {currentItem.title}
                </h2>

                {/* Encargado / Personas (Sección destacada en tamaño grande) */}
                <div className="space-y-6 my-2 border-l-4 border-emerald-400 pl-4 sm:pl-6 py-2">
                  <div>
                    <span className="text-xs sm:text-sm md:text-base tracking-[0.3em] text-emerald-300 uppercase block mb-2 font-bold">
                      {currentItem.personLabel || "Encargado(a)"}
                    </span>
                    {currentItem.category === "Sermón" ? (
                      <div className="space-y-4">
                        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-emerald-400 drop-shadow-sm">
                          {currentItem.person}
                        </p>
                        {currentItem.companions && currentItem.companions.length > 0 && (
                          <div className="pt-3">
                            <span className="text-xs sm:text-sm tracking-[0.3em] text-stone-400 uppercase block mb-2 font-bold">
                              Acompañantes
                            </span>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-stone-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
                              {currentItem.companions.map((comp, i) => (
                                <span key={i} className="text-stone-100">
                                  {comp}
                                  {i < currentItem.companions!.length - 1 ? " • " : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : currentItem.persons && currentItem.persons.length > 0 ? (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {currentItem.persons.map((person, i) => (
                          <p
                            key={i}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-emerald-400 drop-shadow-sm"
                          >
                            {person}
                            {i < currentItem.persons!.length - 1 ? "," : ""}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-emerald-400 drop-shadow-sm">
                        {Array.isArray(currentItem.person)
                          ? currentItem.person.join(", ")
                          : currentItem.person || "Por asignar"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Versículo / Cita Bíblica */}
                {currentItem.verse && (
                  <div className="pt-6 border-t border-white/15 max-w-xl">
                    <p className="text-stone-300 italic text-base md:text-lg leading-relaxed">
                      "{currentItem.verse}"
                    </p>
                    {currentItem.reference && (
                      <p className="text-xs md:text-sm tracking-[0.25em] text-stone-400 mt-2 uppercase font-medium">
                        — {currentItem.reference}
                      </p>
                    )}
                  </div>
                )}

                {/* Botones de Acción */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={handlePrev}
                    className="p-3.5 border border-white/20 bg-white/5 hover:bg-white/15 rounded-full text-white transition-colors cursor-pointer"
                    aria-label="Anuncio Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3.5 border border-white/20 bg-white/5 hover:bg-white/15 rounded-full text-white transition-colors cursor-pointer"
                    aria-label="Anuncio Siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleCopyToWhatsApp}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
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

              {/* Tira del Pie de Columna */}
              <div className="pt-6 border-t border-white/15 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#0B2519]">
                    JA
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full bg-indigo-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#0B2519]">
                    IASD
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#0B2519]">
                    ✝
                  </div>
                </div>
                <p className="text-xs text-stone-300 font-normal leading-tight">
                  Guiamos cada servicio con dedicación y fe.
                </p>
              </div>
            </div>

            {/* Columna Derecha: Fotografía Enmarcada con animación suave */}
            <div className="w-full lg:w-[50%] flex flex-col items-center justify-center pt-8 lg:pt-0">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px] xl:h-[540px] rounded-2xl lg:rounded-[28px] overflow-hidden shadow-2xl border border-white/15 bg-stone-900"
              >
                <Image
                  src={currentItem.image || "/placeholder.svg"}
                  alt={currentItem.title || "Anuncio"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
              <span className="text-[11px] tracking-[0.25em] text-stone-400 uppercase font-medium mt-3 text-center">
                Tu Fe, Nuestra Misión • IASD
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores de Puntos (Dots) Flotantes al Pie de Pantalla */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-stone-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-md">
        {announcements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? "w-7 bg-emerald-400"
                : "w-2.5 bg-white/30 hover:bg-white/60"
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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowSummary(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0D2E1F] border border-white/20 rounded-[2rem] shadow-2xl p-6 md:p-12 relative text-white"
            >
              <button
                onClick={() => setShowSummary(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Cerrar resumen"
              >
                <X className="w-6 h-6 text-stone-300" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-white/15 gap-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight flex items-center gap-3">
                    <ClipboardList className="w-8 h-8 text-emerald-400" />
                    Resumen de Privilegios
                  </h2>
                  <p className="text-stone-300 mt-2 text-sm tracking-wide">{weekLabel}</p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCopyToWhatsApp}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
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
                    className="flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="p-2.5 bg-white/10 border border-white/20 rounded-lg shadow-sm">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="text-xs tracking-wider text-stone-300 uppercase font-medium mb-1">
                        {item.category}
                      </h3>
                      <p className="text-base font-bold tracking-wide text-emerald-300">
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
