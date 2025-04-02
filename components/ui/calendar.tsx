"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Este es un componente de reemplazo para el calendario
// que anteriormente usaba react-day-picker
export type CalendarProps = {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  [key: string]: any
}

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3 text-center", className)}>
      <p className="text-muted-foreground">
        El componente Calendario está temporalmente no disponible.
        {/* Aquí podría implementarse un calendario alternativo en el futuro */}
      </p>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
