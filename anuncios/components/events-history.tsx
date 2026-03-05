"use client"

import Image from "next/image"

const EVENTS_BY_MONTH = {
    "Febrero 2026": [
        {
            id: 1,
            title: "CAMPAMENTO HESED",
            subtitle: "Una experiencia inolvidable",
            image: "/campamento.png",
            date: "13 - 16 de Febrero",
            description: "Un tiempo especial diseñado para fortalecer tu fe y amistades.",
        },
        {
            id: 2,
            title: "VENTA DE SNACKS",
            subtitle: "Sábados en la noche",
            image: "/snacks-sale.png",
            date: "Cada Sábado",
            description: "Compartimos momentos especiales con amigos y hermanos.",
        },
        {
            id: 3,
            title: "10 DÍAS DE ORACIÓN",
            subtitle: "El Espíritu Santo y el Tiempo del Fin",
            image: "/ARTE_BASE_10Dias_es.jpg",
            date: "19 - 28 de Febrero",
            description: "Únete a nosotros en un viaje de reavivamiento espiritual, buscando una relación más profunda con el Espíritu Santo e intercediendo por nuestra comunidad.",
        }
    ]
}

export function EventsHistory() {
    return (
        <div className="bg-[#EFE6D5] min-h-screen pt-56 px-4 md:px-8 lg:px-16 pb-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-light text-stone-800 mb-16 tracking-tight text-center">
                    HISTORIAL DE EVENTOS
                </h2>

                <div className="space-y-20">
                    {Object.entries(EVENTS_BY_MONTH).map(([month, events]) => (
                        <div key={month}>
                            <h3 className="text-2xl md:text-3xl font-light text-stone-700 mb-8 pb-4 border-b border-[#E3D5C1] tracking-wide uppercase">
                                {month}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="group relative bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-[#E3D5C1] hover:border-emerald-500/30 transition-all duration-300 flex flex-col"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-64 w-full overflow-hidden">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="mb-4">
                                                <span className="text-xs tracking-[0.2em] text-stone-400 uppercase block mb-2 font-medium">
                                                    {event.date}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-1">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm text-stone-500 font-light italic">
                                                    {event.subtitle}
                                                </p>
                                            </div>

                                            <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1">
                                                {event.description}
                                            </p>

                                            <div className="mt-auto">
                                                <span className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase border border-[#E3D5C1] rounded-full text-[#A69C8B] group-hover:text-emerald-700 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors duration-300 font-medium">
                                                    Finalizado
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
