"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const EVENTS = [
  {
    id: 1,
    title: "CAMPAMENTO HESED",
    subtitle: "Te esperamos para una experiencia inolvidable",
    image: "/campamento.png",
    badge: "Próximo Evento",
    badgeColor: "bg-[#3d7a3d]",
    date: "13 - 16 de Febrero",
    // time: removed as requested
    cost: "$15",
    location: "Campamento 'HESED'",
    description: "Únete a nosotros en el Campamento Hesed. Un tiempo especial diseñado para fortalecer tu fe y amistades.",
    detailedInfo: "Costo del retiro: $15. Incluye alimentación y estadía.", // Extra info field
  },
  {
    id: 2,
    title: "VENTA DE SNACKS",
    subtitle: "Todos los sábados en la noche - ¡Te esperamos!",
    image: "/snacks-sale.png",
    badge: "Anuncio Semanal",
    badgeColor: "bg-[#d97706]",
    date: "Cada Sábado",
    time: "Después del culto joven", // Updated as requested
    location: "Patio de la Iglesia Central",
    description: "No te pierdas nuestra venta de snacks semanal. Es la oportunidad perfecta para compartir con amigos y hermanos.",
  }
]

export function NoEvents() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null) // State for details
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      // Carousel keeps spinning regardless of details view
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

  const handleExplore = () => {
    // Capture the current event as the selected one
    setSelectedEvent(EVENTS[currentIndex])
    // Allow a small delay for state update/render before scrolling if needed, but usually instant
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
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
                className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-6 leading-none drop-shadow-2xl"
              >
                {currentEvent.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-3xl mb-12"
              >
                <p className="text-xl md:text-3xl text-white/90 font-light tracking-wide leading-relaxed drop-shadow-lg">
                  {currentEvent.subtitle}
                </p>
              </motion.div>

              {/* Explore Button - Appears on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                variants={{
                  hover: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
              >
                <button
                  onClick={handleExplore}
                  className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-bold tracking-[0.3em] uppercase hover:bg-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  Explorar
                </button>
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

      {/* Details Section - Only visible if an event is selected */}
      {selectedEvent && (
        <section ref={detailsRef} className="min-h-[80vh] w-full bg-[#111] flex items-center justify-center py-24 px-4 md:px-12 relative overflow-hidden">
          {/* Background Details */}
          <div className="absolute inset-0 bg-[#0a0a0a]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[128px]" />
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

            {/* Info Side */}
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }} // Changed to animate to trigger on key change
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded-full ${selectedEvent.badgeColor} text-white text-xs font-bold tracking-[0.2em] uppercase mb-6`}>
                  Información Detallada
                </span>
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                  {selectedEvent.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                  {selectedEvent.description}
                </p>
                {/* Specific Layout for Cost/Details */}
                {selectedEvent.cost && (
                  <p className="text-2xl text-emerald-400 font-bold mt-4">
                    Costo: {selectedEvent.cost}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div className="space-y-4">
                  <h4 className="text-white font-medium tracking-[0.2em] uppercase text-sm flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Fecha y Hora
                  </h4>
                  <p className="text-2xl text-white/90 font-light">{selectedEvent.date}</p>
                  {selectedEvent.time ? (
                    <p className="text-blue-400 font-mono">{selectedEvent.time}</p>
                  ) : (
                    <p className="text-gray-500 italic text-sm">Horario a confirmar</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium tracking-[0.2em] uppercase text-sm flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Ubicación
                  </h4>
                  <p className="text-xl text-white/90 font-light leading-snug">{selectedEvent.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Decor/Map Side */}
            <motion.div
              key={selectedEvent.id + "-img"} // Force re-render on change
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <Image
                src={selectedEvent.image}
                alt="Detalle"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <p className="text-gray-300 text-sm font-light italic">
                    {selectedEvent.id === 1 ? "¡Reserva tu lugar con tiempo!" : "¡Disfruta y colabora!"}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      )}
    </div>
  )
}
