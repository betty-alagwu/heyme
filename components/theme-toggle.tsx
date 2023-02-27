import * as React from "react"
import { useTheme } from "next-themes"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 
