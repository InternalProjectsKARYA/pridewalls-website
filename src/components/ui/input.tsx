import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `
        file:text-foreground placeholder:text-muted-foreground
        selection:bg-primary selection:text-primary-foreground
        dark:bg-input/30
        flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm
        border  bg-transparent shadow-xs outline-none
        transition-[color,box-shadow,border] duration-200
        focus-visible:border-[#c32630]
        focus-visible:ring-[3px]
        focus-visible:ring-[#c32630]/25
        aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
        aria-invalid:border-destructive
        file:inline-flex file:h-7 file:border-0 file:bg-transparent
        file:text-sm file:font-medium
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  )
}

export { Input }