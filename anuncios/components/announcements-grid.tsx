"use client"

import { useRef } from "react"
import Image from "next/image"

const announcements = [
  {
    id: "PP01",
    category: "Sermón",
    title: "SERMON PARA EL DIA SABADO",
    person: "Hno. Jhosua Sarango",
    companions: ["Hno. Daniel Medina", "Hno. Julita Qituizaca"],
    personLabel: "Predica",
    verse:
      "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    reference: "Juan 3:16",
    image: "/bibli.jpg",
  },
  {
    id: "PP02",
    category: "Limpieza",
    title: "LIMPIEZA DE LA IGLESIA",
    persons: ["Fam. Sinche Jaramillo"],
    personLabel: "Nos ayudan las hermanas",
    verse: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.",
    reference: "Colosenses 3:23",
    image: "/limpieza.jpg",
  },
  {
    id: "PP03",
    category: "Flores",
    title: "FLORES PARA LA IGLESIA",
    person: ["Hna. Apolonia", "Ines Garcia."],
    personLabel: "Nos ayuda el hermano",
    verse:
      "Considerad los lirios del campo, cómo crecen: no trabajan ni hilan; pero os digo, que ni aun Salomón con toda su gloria se vistió así como uno de ellos.",
    reference: "Mateo 6:28-29",
    image: "/church-altar-flowers-adventist-decoration-lilies.jpg",
  },
  {
    id: "PP04",
    category: "Diezmos y Ofrendas",
    title: "RECOLECCIONES DE DIEZMOS Y OFRENDAS",
    persons: ["Hna. Camila Cuperan", "Hna. Ideli Jumbo"],
    personLabel: "Nos ayudan los hermanos",
    verse: "Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos, y derramaré sobre vosotros bendición hasta que sobreabunde.",
    reference: "Malaquías 3:10",
    image: "/diezmos.png",
  },
  {
    id: "PP05",
    category: "Ofrendas de Niños",
    title: "OFRENDAS DE NIÑOS",
    person: "Hna. Megan Sinche",
    personLabel: "Nos ayuda la hermana",
    verse: "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.",
    reference: "Proverbios 22:6",
    image: "/ninosdiezmo.png",
  },
  {
    id: "PP06",
    category: "Conteo de Diezmo",
    title: "CONTEO DE DIEZMO",
    person: "Hna. Carolina Sarango",
    personLabel: "Nos ayuda el hermano",
    verse: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.",
    reference: "2 Corintios 9:7",
    image: "/conteodiezmo.png",
  },
  {
    id: "PP07",
    category: "Apertura del Templo",
    title: "APERTURA DEL TEMPLO",
    person: "Hna. Narciza Cabrera",
    personLabel: "Nos ayuda el hermano",
    verse: "Entrad por sus puertas con acción de gracias, por sus atrios con alabanza; alabadle, bendecid su nombre.",
    reference: "Salmos 100:4",
    image: "/apertura.png",
  },
]

export function AnnouncementsGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="bg-[#1a1a1a] pt-40">
      {announcements.map((item, index) => (
        <section key={item.id} className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Panel - Text Content */}
          <div
            className={`w-full lg:w-[55%] bg-[#1a1a1a] flex flex-col justify-between p-10 md:p-16 lg:p-20 xl:p-24 min-h-[50vh] lg:min-h-screen ${
              index % 2 === 1 ? "lg:order-2" : ""
            }`}
          >
            {/* Top - ID */}
            <div className="mb-8">
              <span className="text-sm md:text-base tracking-[0.3em] text-[#555]">{item.id}</span>
            </div>

            {/* Center - Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#f5f5f0] tracking-tight leading-[0.95] mb-10">
                {item.title}
              </h2>

              {item.category === "Sermón" ? (
                <div className="space-y-8">
                  <div>
                    <span className="text-xs md:text-sm tracking-[0.3em] text-[#666] uppercase block mb-3">
                      {item.personLabel}
                    </span>
                    <p className="text-2xl md:text-3xl lg:text-4xl text-[#f5f5f0]/90 font-light">{item.person}</p>
                  </div>
                  {item.companions && item.companions.length > 0 && (
                    <div>
                      <span className="text-xs md:text-sm tracking-[0.3em] text-[#666] uppercase block mb-3">
                        Acompañantes
                      </span>
                      <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {item.companions.map((companion, i) => (
                          <p key={i} className="text-xl md:text-2xl lg:text-3xl text-[#f5f5f0]/70 font-light">
                            {companion}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : item.persons ? (
                <div>
                  <span className="text-xs md:text-sm tracking-[0.3em] text-[#666] uppercase block mb-3">
                    {item.personLabel}
                  </span>
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {item.persons.map((person, i) => (
                      <p key={i} className="text-2xl md:text-3xl lg:text-4xl text-[#f5f5f0]/90 font-light">
                        {person}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-xs md:text-sm tracking-[0.3em] text-[#666] uppercase block mb-3">
                    {item.personLabel}
                  </span>
                  <p className="text-2xl md:text-3xl lg:text-4xl text-[#f5f5f0]/90 font-light">{item.person}</p>
                </div>
              )}

              <div className="mt-12 lg:mt-16 pt-8 border-t border-[#333] max-w-lg">
                <p className="text-base md:text-lg text-[#999] leading-relaxed italic">"{item.verse}"</p>
                <p className="text-xs md:text-sm tracking-[0.25em] text-[#666] mt-4 uppercase">— {item.reference}</p>
              </div>
            </div>

            {/* Bottom - Category */}
            <div className="mt-8">
              <span className="text-xs md:text-sm tracking-[0.3em] text-[#555] uppercase">{item.category}</span>
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
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {announcements.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="w-3 h-3 rounded-full bg-[#f5f5f0]/30 hover:bg-[#f5f5f0] transition-colors duration-300"
            aria-label={`Ir a ${item.title}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs tracking-[0.3em] text-[#555] uppercase">Scroll</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#555]"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
