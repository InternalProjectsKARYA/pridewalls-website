import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
        flex field-sizing-content min-h-24 w-full rounded-md px-3.5 py-3 text-base md:text-sm
        border border-input bg-white
        placeholder:text-muted-foreground shadow-xs outline-none
        transition-[color,box-shadow,border] duration-200
        focus-visible:border-primary
        focus-visible:ring-[3px]
        focus-visible:ring-primary/20
        aria-invalid:ring-destructive/20 aria-invalid:border-destructive
        dark:aria-invalid:ring-destructive/40
        disabled:cursor-not-allowed disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
