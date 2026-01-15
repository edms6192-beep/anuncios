"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AnnouncementsGrid } from "@/components/announcements-grid"
import { NoEvents } from "@/components/no-events"
import { NextWeekAnnouncements } from "@/components/next-week-announcements"
import { WednesdayPrayer } from "@/components/wednesday-prayer"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"anuncios" | "eventos">("anuncios")
  const [activeSubTab, setActiveSubTab] = useState<"esta-semana" | "proxima-semana" | "miercoles-oracion">("esta-semana")

  const renderContent = () => {
    if (activeTab === "eventos") {
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
        onTabChange={setActiveTab}
        activeSubTab={activeSubTab}
        onSubTabChange={setActiveSubTab}
      />

      {renderContent()}
    </main>
  )
}
