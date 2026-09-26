"use client"

import { Announcement } from "@/lib/sheets"
import { AnnouncementCarousel } from "@/components/announcement-carousel"

interface NextWeekAnnouncementsProps {
  announcements: Announcement[]
}

export function NextWeekAnnouncements({ announcements }: NextWeekAnnouncementsProps) {
  return <AnnouncementCarousel announcements={announcements} weekLabel="Próxima Semana" />
}
