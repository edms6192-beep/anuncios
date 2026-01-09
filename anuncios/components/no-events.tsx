export function NoEvents() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="text-center px-8">
        <span className="text-[11px] tracking-[0.25em] text-[#666] uppercase block mb-8">Eventos</span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#f5f5f0] tracking-wide mb-6">
          NO HAY EVENTOS
        </h2>
        <h3 className="text-xl md:text-2xl font-light text-[#f5f5f0]/60 tracking-wide">POR EL MOMENTO</h3>

        <div className="mt-16 max-w-sm mx-auto">
          <p className="text-sm text-[#666] leading-relaxed italic">
            "Para todo hay un tiempo, y un momento para cada cosa bajo el cielo."
          </p>
          <p className="text-xs tracking-[0.2em] text-[#555] mt-4 uppercase">— Eclesiastés 3:1</p>
        </div>
      </div>
    </section>
  )
}
