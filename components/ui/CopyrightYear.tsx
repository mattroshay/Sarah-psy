'use client'

/** Renders the current year client-side so it updates automatically without a rebuild. */
export function CopyrightYear() {
  return <>{new Date().getFullYear()}</>
}
