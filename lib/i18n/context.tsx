"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, localeDirections, getTranslation } from "./translations"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    // Load saved locale from localStorage
    const saved = localStorage.getItem("peysaz-locale") as Locale | null
    if (saved && ["fa", "en", "zh"].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("peysaz-locale", newLocale)
    // Update document direction
    document.documentElement.dir = localeDirections[newLocale]
    document.documentElement.lang = newLocale
  }

  const t = (key: string) => getTranslation(locale, key)
  const dir = localeDirections[locale]

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [locale, dir])

  return <I18nContext.Provider value={{ locale, setLocale, t, dir }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
