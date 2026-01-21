import Image from 'next/image'

const EVENTS = [
  {
    id: 1,
    title: "CAMPAMENTO HESED",
    subtitle: "Te esperamos para una experiencia inolvidable",
    image: "/campamento.png", // Corrected path
    badge: "Próximo Evento",
    badgeColor: "bg-[#3d7a3d]",
    accentColor: "bg-[#3d7a3d]",
    objectFit: "cover" // Default fit
  },
  {
    id: 2,
    title: "VENTA DE SNACKS",
    subtitle: "Todos los sábados en la noche - ¡Te esperamos!",
    image: "/snacks-sale.png",
    badge: "Anuncio Semanal",
    badgeColor: "bg-[#d97706]",
    accentColor: "bg-[#d97706]",
    objectFit: "contain" // Show full image
  }
]

export function NoEvents() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] overflow-hidden py-24 md:py-32 gap-16">
      {/* Background Ambience - Forest/Nature Tones */}
      <div className="absolute inset-0 pointer-events-none fixed">
        {/* Left Green Glow - Moss/Forest */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#1a4a1a]/40 to-transparent blur-[100px]" />
        {/* Right Green Glow - Leaves/Nature */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2d5a2d]/40 to-transparent blur-[100px]" />

        {/* Subtle Texture/Grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      {EVENTS.map((event) => (
        <div key={event.id} className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center justify-center">

          {/* Central Card */}
          <div className="group relative w-full max-w-3xl md:max-w-5xl mx-auto rounded-3xl transition-all duration-500 hover:-translate-y-2 mt-8 md:mt-0">

            {/* Card Shadow / Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-b from-[${event.accentColor.replace('bg-[', '').replace(']', '')}] to-[#1a1a1a] rounded-3xl opacity-20 blur-lg group-hover:opacity-40 group-hover:blur-xl transition-all duration-500`} />

            {/* Card Container */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#333] shadow-2xl flex flex-col">

              {/* Badge - Top Right */}
              <div className="absolute top-4 right-4 z-30">
                <span className={`inline-flex items-center px-3 py-1 rounded-full ${event.badgeColor} text-[#f5f5f0] text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-lg shadow-black/20 backdrop-blur-md border border-[#ffffff]/10`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 mr-2 animate-pulse" />
                  {event.badge}
                </span>
              </div>

              {/* Content Area (Top Half) */}
              <div className="relative p-8 md:p-12 text-center bg-[#1a1a1a] z-10 flex flex-col items-center">
                {/* Decorative Element */}
                <div className={`h-1 w-16 mx-auto ${event.accentColor} rounded-full mb-8 shadow-[0_0_8px_currentColor] opacity-80`} />

                <h2 className="text-4xl md:text-6xl font-black text-[#f5f5f0] tracking-tighter mb-4 leading-tight">
                  {event.title}
                </h2>

                <p className="text-[#f5f5f0]/70 font-medium tracking-wide text-sm md:text-base uppercase max-w-md mx-auto leading-relaxed mb-4">
                  {event.subtitle}
                </p>
              </div>

              {/* Image Area (Bottom Half) */}
              <div className={`relative aspect-video w-full overflow-hidden bg-black ${event.objectFit === 'contain' ? 'bg-black/80' : ''}`}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className={`${event.objectFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                  priority={event.id === 1}
                />

                {/* Conditional Gradients - Only for cover fit to blend */}
                {event.objectFit === 'cover' && (
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1a1a1a] to-transparent opacity-80" />
                )}

                {/* Optional CTA overlay on image bottom */}
                <div className="absolute bottom-0 w-full p-6 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <span className={`text-xs text-[#f5f5f0]/80 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300`}>
                    {/*Ver más información*/}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Footer Ambient Info */}
      <div className="text-[#f5f5f0]/40 text-xs tracking-[0.2em] font-light uppercase mix-blend-plus-lighter">
        Scroll para ver más eventos
      </div>

    </section>
  )
}
