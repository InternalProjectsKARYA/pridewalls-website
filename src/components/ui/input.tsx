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
        flex h-11 w-full min-w-0 rounded-md px-3.5 py-2 text-base md:text-sm
        border border-input bg-white shadow-xs outline-none
        transition-[color,box-shadow,border] duration-200
        focus-visible:border-primary
        focus-visible:ring-[3px]
        focus-visible:ring-primary/20
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
