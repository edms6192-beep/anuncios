"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AnnouncementsGrid } from "@/components/announcements-grid"
import { NoEvents } from "@/components/no-events"
import { NextWeekAnnouncements } from "@/components/next-week-announcements"
import { WednesdayPrayer } from "@/components/wednesday-prayer"
import { EventsHistory } from "@/components/events-history"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"anuncios" | "eventos">("anuncios")
  const [activeSubTab, setActiveSubTab] = useState<"esta-semana" | "proxima-semana" | "miercoles-oracion" | "proximos-eventos" | "historial">("esta-semana")

  const handleTabChange = (tab: "anuncios" | "eventos") => {
    setActiveTab(tab)
    if (tab === "anuncios") {
      setActiveSubTab("esta-semana")
    } else {
      setActiveSubTab("proximos-eventos")
    }
  }

  const renderContent = () => {
    if (activeTab === "eventos") {
      if (activeSubTab === "historial") {
        return <EventsHistory />
      }
      return <NoEvents />
    }

    if (activeSubTab === "esta-semana") {
      return <AnnouncementsGrid />
    }

    if (activeSubTab === "proxima-semana") {
      return <NextWeekAnnouncements />
    }

    return <WednesdayPrayer />
  }

  return (
    <main className="bg-[#1a1a1a]">
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeSubTab={activeSubTab}
        onSubTabChange={setActiveSubTab}
      />

      {renderContent()}
    </main>
  )
}
