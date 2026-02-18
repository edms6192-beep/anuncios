"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const EVENTS: {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  badgeColor: string;
  date: string;
  time?: string;
  cost?: string;
  location: string;
  description: string;
  detailedInfo?: string;
}[] = [
    {
      id: 1,
      title: "10 DÍAS DE ORACIÓN",
      subtitle: "El Espíritu Santo y el Tiempo del Fin",
      image: "/ARTE_BASE_10Dias_es.jpg",
      badge: "Evento Especial",
      badgeColor: "bg-[#8b5cf6]",
      date: "19 - 28 de Febrero",
      time: "Programación diaria",
      location: "Iglesia del Valle",
      description: "Únete a nosotros en un viaje de reavivamiento espiritual, buscando una relación más profunda con el Espíritu Santo e intercediendo por nuestra comunidad.",
      detailedInfo: "El primer sábado tendremos un programa especial con 10 horas de ayuno y oración. Este material es una invitación a la acción para buscar diariamente al Espíritu Santo.",
    }
  ]

export function NoEvents() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 8000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === EVENTS.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? EVENTS.length - 1 : prev - 1))
  }

  const handleScrollDown = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    })
  }

  const currentEvent = EVENTS[currentIndex]

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-5xl font-light text-[#333] tracking-tight mb-4">
            NO HAY EVENTOS PRÓXIMOS
          </h2>
          <p className="text-[#666] tracking-widest uppercase text-sm">
            Pronto anunciaremos nuevas actividades
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Full Screen Carousel Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 z-30 flex items-center px-4 md:px-8 pointer-events-none">
          <button
            onClick={prevSlide}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/40 transition-all duration-300 group pointer-events-auto"
            aria-label="Anterior evento"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-30 flex items-center px-4 md:px-8 pointer-events-none">
          <button
            onClick={nextSlide}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/40 transition-all duration-300 group pointer-events-auto"
            aria-label="Siguiente evento"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Main Carousel Area */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentEvent.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            whileHover="hover"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Full Screen Image */}
            <div className="absolute inset-0 bg-black">
              <Image
                src={currentEvent.image}
                alt={currentEvent.title}
                fill
                className="object-cover opacity-60"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-20 max-w-7xl mx-auto">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full ${currentEvent.badgeColor} text-[#f5f5f0] text-xs md:text-sm font-bold tracking-[0.2em] uppercase shadow-lg backdrop-blur-md border border-white/20`}>
                  <span className="w-2 h-2 rounded-full bg-white mr-3 animate-pulse" />
                  {currentEvent.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-none drop-shadow-2xl"
              >
                {currentEvent.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-4xl mb-12"
              >
                <p className="text-lg md:text-2xl text-white/90 font-light tracking-wide leading-relaxed drop-shadow-lg">
                  {currentEvent.subtitle}
                </p>
              </motion.div>

              {/* Scroll Down Indicator (Replacing Explore Button) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce cursor-pointer z-40"
                onClick={handleScrollDown}
              >
                <span className="text-xs tracking-[0.3em] text-white/70 uppercase">Ver detalles</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/70"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-4">
          {EVENTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1)
                setCurrentIndex(idx)
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-16 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Details Section - Always visible below */}
      <section ref={detailsRef} className="min-h-[80vh] w-full bg-[#111] flex items-center justify-center py-24 px-4 md:px-12 relative overflow-hidden">
        {/* Background Details */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[128px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Info Side */}
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <span className={`inline-block px-3 py-1 rounded-full ${currentEvent.badgeColor} text-white text-xs font-bold tracking-[0.2em] uppercase mb-6`}>
                Información Detallada
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                {currentEvent.title}
              </h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                {currentEvent.description}
              </p>
              {currentEvent.detailedInfo && (
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light mt-4">
                  {currentEvent.detailedInfo}
                </p>
              )}
              {/* Specific Layout for Cost/Details */}
              {currentEvent.cost && (
                <p className="text-2xl text-emerald-400 font-bold mt-4">
                  Costo: {currentEvent.cost}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div className="space-y-4">
                <h4 className="text-white font-medium tracking-[0.2em] uppercase text-sm flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Fecha y Hora
                </h4>
                <p className="text-2xl text-white/90 font-light">{currentEvent.date}</p>
                {currentEvent.time ? (
                  <p className="text-blue-400 font-mono">{currentEvent.time}</p>
                ) : (
                  <p className="text-gray-500 italic text-sm">Horario a confirmar</p>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium tracking-[0.2em] uppercase text-sm flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> Ubicación
                </h4>
                <p className="text-xl text-white/90 font-light leading-snug">{currentEvent.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Decor/Map Side */}
          <motion.div
            key={currentEvent.id + "-img"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
          >
            <Image
              src={currentEvent.image}
              alt="Detalle"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                <p className="text-gray-300 text-sm font-light italic">
                  {currentEvent.id === 1 ? "¡Reserva tu lugar con tiempo!" : "¡Disfruta y colabora!"}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  )
}
