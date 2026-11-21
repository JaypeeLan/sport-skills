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

// Renders Google's own "Sign in with Google" button. Google returns an ID token,
// which onCredential sends to the API through a server action.
// The client id comes from the server at request time (GOOGLE_CLIENT_ID), so one
// build can serve staging and production.
export default function GoogleButton({
  clientId,
  text,
  onCredential,
}: {
  clientId: string | undefined
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
    if (!clientId || !window.google || !container.current) return
    window.google.accounts.id.initialize({
      client_id: clientId,
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
  }, [clientId, text])

  // Covers the case where the script loaded before this component mounted.
  useEffect(() => {
    render()
  }, [render])

  if (!clientId) return null

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onReady={render} />
      {/* The page uses a dark color scheme. Google's iframe uses light, and when the two
          differ the browser paints the iframe white. A light scheme here keeps it transparent. */}
      <div ref={container} className="flex min-h-11 w-full justify-center" style={{ colorScheme: 'light' }} />
    </>
  )
}
