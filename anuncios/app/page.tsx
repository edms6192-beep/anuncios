"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { AnnouncementsGrid } from "@/components/announcements-grid"
import { NoEvents } from "@/components/no-events"
import { NextWeekAnnouncements } from "@/components/next-week-announcements"
import { WednesdayPrayer } from "@/components/wednesday-prayer"
import { EventsHistory } from "@/components/events-history"
import { fetchAnnouncementsFromSheet, getConfigs, Announcement } from "@/lib/sheets"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"anuncios" | "eventos">("anuncios")
  const [activeSubTab, setActiveSubTab] = useState<"esta-semana" | "proxima-semana" | "miercoles-oracion" | "proximos-eventos" | "historial">("esta-semana")
  const [data, setData] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncementsFromSheet().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const handleTabChange = (tab: "anuncios" | "eventos") => {
    setActiveTab(tab)
    if (tab === "anuncios") {
      setActiveSubTab("esta-semana")
    } else {
      setActiveSubTab("proximos-eventos")
    }
  }

  const configs = getConfigs(data)
  const estaSemana = data.filter(d => d.type === 'esta-semana')
  const proximaSemana = data.filter(d => d.type === 'proxima-semana')
  const miercolesData = data.find(d => d.type === 'miercoles')

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#EFE6D5]">
          <div className="animate-pulse text-stone-500 tracking-[0.2em] font-medium">Cargando anuncios...</div>
        </div>
      )
    }

    if (activeTab === "eventos") {
      if (activeSubTab === "historial") {
        return <EventsHistory />
      }
      return <NoEvents />
    }

    if (activeSubTab === "esta-semana") {
      return <AnnouncementsGrid announcements={estaSemana} />
    }

    if (activeSubTab === "proxima-semana") {
      return <NextWeekAnnouncements announcements={proximaSemana} />
    }

    return <WednesdayPrayer data={miercolesData} />
  }

  return (
    <main className="bg-[#EFE6D5] min-h-screen">
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeSubTab={activeSubTab}
        onSubTabChange={setActiveSubTab}
        thisWeekTitle={configs.thisWeek}
        nextWeekTitle={configs.nextWeek}
        wednesdayTitle={configs.wednesday}
      />

      {renderContent()}
    </main>
  )
}
