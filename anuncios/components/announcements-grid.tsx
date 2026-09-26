"use client"

import { Announcement } from "@/lib/sheets"
import { AnnouncementCarousel } from "@/components/announcement-carousel"

interface AnnouncementsGridProps {
  announcements: Announcement[]
}

export function AnnouncementsGrid({ announcements }: AnnouncementsGridProps) {
  return <AnnouncementCarousel announcements={announcements} weekLabel="Esta Semana" />
}
