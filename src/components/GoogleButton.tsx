'use client'

import { useCallback, useEffect, useRef } from 'react'
import Script from 'next/script'

interface GoogleCredentialResponse {
  credential: string
}

interface GoogleIdentity {
  accounts: {
    id: {
      initialize(options: {
        client_id: string
        callback: (response: GoogleCredentialResponse) => void
        ux_mode?: 'popup' | 'redirect'
      }): void
      renderButton(element: HTMLElement, options: Record<string, string | number>): void
    }
  }
}

declare global {
  interface Window {
    google?: GoogleIdentity
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

// Renders Google's own "Sign in with Google" button. Google returns an ID token,
// which onCredential sends to the API through a server action.
export default function GoogleButton({
  text,
  onCredential,
}: {
  text: 'signin_with' | 'signup_with' | 'continue_with'
  onCredential: (credential: string) => void
}) {
  const container = useRef<HTMLDivElement>(null)
  // Keeps the latest callback without re-rendering Google's button.
  const callback = useRef(onCredential)
  useEffect(() => {
    callback.current = onCredential
  }, [onCredential])

  const render = useCallback(() => {
    if (!CLIENT_ID || !window.google || !container.current) return
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response) => callback.current(response.credential),
      ux_mode: 'popup',
    })
    window.google.accounts.id.renderButton(container.current, {
      theme: 'filled_black',
      size: 'large',
      shape: 'pill',
      text,
      width: container.current.offsetWidth || 320,
    })
  }, [text])

  // Covers the case where the script loaded before this component mounted.
  useEffect(() => {
    render()
  }, [render])

  if (!CLIENT_ID) return null

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onReady={render} />
      {/* The page uses a dark color scheme. Google's iframe uses light, and when the two
          differ the browser paints the iframe white. A light scheme here keeps it transparent. */}
      <div ref={container} className="flex min-h-11 w-full justify-center" style={{ colorScheme: 'light' }} />
    </>
  )
}
