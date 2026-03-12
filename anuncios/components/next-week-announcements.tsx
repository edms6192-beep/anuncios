"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, HandHeart, Sparkles, Coins, Baby, Calculator, DoorOpen, Flower2, ClipboardList, Copy, Check, X } from 'lucide-react'

const announcements = [
  {
    id: "PP01",
    category: "Sermón",
    title: "SERMON PARA EL DIA SABADO",
    person: "----------",
    companions: ["------------", "------------"],
    personLabel: "Predica",
    verse:
      "Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree; al judío primeramente, y también al griego.",
    reference: "Romanos 1:16",
    image: "/bibli.jpg",
  },
  {
    id: "PP02",
    category: "Limpieza",
    title: "LIMPIEZA DE LA IGLESIA",
    persons: ["------------", "------------"],
    personLabel: "Nos ayudan la Familia",
    verse: "pero hágase todo decentemente y con orden.",
    reference: "1 Corintios 14:40",
    image: "/limpieza.jpg",
  },
  {
    id: "PP03",
    category: "Flores",
    title: "FLORES PARA LA IGLESIA",
    person: ["------------", "------------"],
    personLabel: "Nos ayuda la hermana",
    verse:
      "Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre.",
    reference: "Isaías 40:8",
    image: "/church-altar-flowers-adventist-decoration-lilies.jpg",
  },
  {
    id: "PP04",
    category: "Diezmos y Ofrendas",
    title: "RECOLECCIONES DE DIEZMOS Y OFRENDAS",
    persons: ["------------", "------------"],
    personLabel: "Nos ayudan los hermanos",
    verse: "Y poderoso es Dios para hacer que abunde en vosotros toda gracia, a fin de que, teniendo siempre en todas las cosas todo lo suficiente, abundéis para toda buena obra;",
    reference: "2 Corintios 9:8",
    image: "/diezmos.png",
  },
  {
    id: "PP05",
    category: "Ofrendas de Niños",
    title: "OFRENDAS DE NIÑOS",
    person: "------------",
    personLabel: "Nos ayuda el hermano",
    verse: "Viéndolo Jesús, se indignó, y les dijo: Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de Dios.",
    reference: "Marcos 10:14",
    image: "/ninosdiezmo.png",
  },
  {
    id: "PP06",
    category: "Conteo de Diezmo",
    title: "CONTEO DE DIEZMO",
    person: "------------",
    personLabel: "Nos ayuda el hermano",
    verse: "Y el diezmo de la tierra, así de la simiente de la tierra como del fruto de los árboles, de Jehová es; es cosa dedicada a Jehová.",
    reference: "Levítico 27:30",
    image: "/conteodiezmo.png",
  },
  {
    id: "PP07",
    category: "Apertura del Templo",
    title: "APERTURA DEL TEMPLO",
    person: "H------------",
    personLabel: "Nos ayuda el hermana",
    verse: "Yo me alegré con los que me decían: A la casa de Jehová iremos.",
    reference: "Salmos 122:1",
    image: "/apertura.png",
  },
]

export function NextWeekAnnouncements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const handleCopyToWhatsApp = () => {
    let textToCopy = "📋 *RESUMEN DE PRIVILEGIOS - PRÓXIMA SEMANA* 📋\n\n";

    announcements.forEach((item) => {
      textToCopy += `🔹 *${item.category}*:\n`;
      if (item.category === "Sermón") {
        textToCopy += `   • ${item.person}\n`;
        if (item.companions && item.companions.length > 0) {
          item.companions.forEach(c => textToCopy += `   • ${c}\n`);
        }
      } else if (item.persons) {
        textToCopy += `   • ${item.persons.join(", ")}\n`;
      } else {
        textToCopy += `   • ${item.person}\n`;
      }
      textToCopy += "\n";
    });

    textToCopy += "🙏 ¡Que Dios bendiga su ministerio!";

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sermón": return "text-blue-800"
      case "Limpieza":
      case "Apertura del Templo": return "text-emerald-700"
      case "Flores":
      case "Diezmos y Ofrendas":
      case "Ofrendas de Niños":
      case "Conteo de Diezmo": return "text-orange-700"
      default: return "text-emerald-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sermón": return <BookOpen className={`w-5 h-5 ${getCategoryColor(category)}`} />
      case "Limpieza": return <Sparkles className={`w-5 h-5 ${getCategoryColor(category)}`} />
      case "Flores": return <Flower2 className={`w-5 h-5 ${getCategoryColor(category)}`} />
      case "Diezmos y Ofrendas": return <Coins className={`w-5 h-5 ${getCategoryColor(category)}`} />
      case "Ofrendas de Niños": return <Baby className={`w-5 h-5 ${getCategoryColor(category)}`} />
      case "Conteo de Diezmo": return <Calculator className={`w-5 h-5 ${getCategoryColor(category)}`} />
      case "Apertura del Templo": return <DoorOpen className={`w-5 h-5 ${getCategoryColor(category)}`} />
      default: return <HandHeart className={`w-5 h-5 ${getCategoryColor(category)}`} />
    }
  }

  return (
    <div ref={containerRef} className="bg-[#EFE6D5] pt-[200px] lg:pt-[240px]">
      {/* Botón Superior para ver resumen */}
      <div className="container mx-auto px-6 mb-8 mt-4 flex justify-start">
        <button
          onClick={() => setShowSummary(true)}
          className="group relative px-4 py-2 bg-white border border-[#E3D5C1] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          <ClipboardList className="w-4 h-4 text-emerald-700 relative z-10" />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.1em] text-stone-800 uppercase relative z-10">
            Ver Resumen de Privilegios
          </span>
        </button>
      </div>

      {/* Modal de Resumen */}
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
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] border border-[#E3D5C1] rounded-[2rem] shadow-2xl p-8 md:p-16 relative"
            >
              <button
                onClick={() => setShowSummary(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 transition-colors"
                aria-label="Cerrar resumen"
              >
                <X className="w-6 h-6 text-stone-500" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-8 border-b border-[#E3D5C1] gap-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-light text-stone-800 tracking-tight flex items-center gap-4">
                    <ClipboardList className="w-8 h-8 md:w-12 md:h-12 text-emerald-700" />
                    Resumen de Privilegios
                  </h2>
                  <p className="text-stone-500 mt-4 tracking-wide">Próxima semana</p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCopyToWhatsApp}
                    className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 shadow-sm hover:shadow-md ${copied
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-emerald-700 border border-[#E3D5C1] hover:border-emerald-300 hover:bg-emerald-50"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {announcements.map((item) => (
                  <div key={`summary-next-${item.id}`} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors border border-transparent hover:border-[#E3D5C1]">
                    <div className="mt-1 p-3 bg-white border border-[#E3D5C1] rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="text-xs tracking-[0.2em] text-stone-500 uppercase font-medium mb-1">
                        {item.category}
                      </h3>
                      {item.category === "Sermón" ? (
                        <div className="flex flex-wrap gap-x-2">
                          <p className={`text-lg md:text-xl font-bold tracking-wide ${getCategoryColor(item.category)}`}>
                            {item.person}
                          </p>
                          {item.companions && item.companions.map((c, i) => (
                            <p key={i} className={`text-lg md:text-xl font-bold tracking-wide ${getCategoryColor(item.category)}`}>
                              , {c}
                            </p>
                          ))}
                        </div>
                      ) : item.persons ? (
                        <p className={`text-lg md:text-xl font-bold tracking-wide ${getCategoryColor(item.category)}`}>
                          {item.persons.join(", ")}
                        </p>
                      ) : (
                        <p className={`text-lg md:text-xl font-bold tracking-wide ${getCategoryColor(item.category)}`}>
                          {item.person}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {announcements.map((item, index) => (
        <section key={item.id} className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Panel - Text Content */}
          <div
            className={`w-full lg:w-[55%] bg-[#EFE6D5] flex flex-col justify-between p-10 md:p-16 lg:p-20 xl:p-24 min-h-[50vh] lg:min-h-screen ${index % 2 === 1 ? "lg:order-2" : ""
              }`}
          >
            {/* Top - ID & Icon */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-sm md:text-base tracking-[0.3em] text-stone-400 font-medium">{item.id}</span>
              <div className="p-2 bg-white/50 rounded-lg shadow-sm border border-[#E3D5C1]">
                {getCategoryIcon(item.category)}
              </div>
            </div>

            {/* Center - Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-stone-800 tracking-tight leading-[0.95] mb-10">
                {item.title}
              </h2>

              {item.category === "Sermón" ? (
                <div className="space-y-8">
                  <div>
                    <span className="text-xs md:text-sm tracking-[0.3em] text-stone-500 uppercase block mb-3 font-medium">
                      {item.personLabel}
                    </span>
                    <motion.p
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${getCategoryColor(item.category)}`}
                    >
                      {item.person}
                    </motion.p>
                  </div>
                  {item.companions && item.companions.length > 0 && (
                    <div>
                      <span className="text-xs md:text-sm tracking-[0.3em] text-stone-500 uppercase block mb-3 font-medium">
                        Acompañantes
                      </span>
                      <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {item.companions.map((companion, i) => (
                          <motion.p
                            key={i}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                            className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-wide ${getCategoryColor(item.category)}`}
                          >
                            {companion}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : item.persons ? (
                <div>
                  <span className="text-xs md:text-sm tracking-[0.3em] text-stone-500 uppercase block mb-3 font-medium">
                    {item.personLabel}
                  </span>
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {item.persons.map((person, i) => (
                      <motion.p
                        key={i}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                        className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${getCategoryColor(item.category)}`}
                      >
                        {person}
                      </motion.p>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-xs md:text-sm tracking-[0.3em] text-stone-500 uppercase block mb-3 font-medium">
                    {item.personLabel}
                  </span>
                  <motion.p
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${getCategoryColor(item.category)}`}
                  >
                    {item.person}
                  </motion.p>
                </div>
              )}

              <div className="mt-12 lg:mt-16 pt-8 border-t border-[#E3D5C1] max-w-lg">
                <p className="text-base md:text-lg text-[#8C8374] leading-relaxed italic">"{item.verse}"</p>
                <p className="text-xs md:text-sm tracking-[0.25em] text-[#A69C8B] mt-4 uppercase font-medium">— {item.reference}</p>
              </div>
            </div>

            {/* Bottom - Category */}
            <div className="mt-8">
              <span className="text-xs md:text-sm tracking-[0.3em] text-stone-400 uppercase font-medium">{item.category}</span>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div
            className={`w-full lg:w-[45%] relative min-h-[50vh] lg:min-h-screen ${index % 2 === 1 ? "lg:order-1" : ""}`}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority={index === 0}
            />
          </div>
        </section>
      ))}

      {/* Navigation Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 items-center">
        <button
          onClick={() => setShowSummary(true)}
          className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm hover:scale-150 transition-all duration-300 cursor-pointer"
          aria-label="Ver Resumen"
          title="Resumen"
        />
        {announcements.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="w-2.5 h-2.5 rounded-full bg-[#E3D5C1] hover:bg-emerald-600 hover:scale-125 transition-all duration-300"
            aria-label={`Ir a ${item.title}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs tracking-[0.3em] text-stone-400 uppercase font-medium">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-stone-400"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
