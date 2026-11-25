import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/stores'

function AppleLogo() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M16.37 12.62c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.49ZM14.2 6.16c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22Z" />
    </svg>
  )
}

function PlayLogo() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6">
      <path d="M3.6 2.3 13.3 12l-9.7 9.7c-.36-.2-.6-.6-.6-1.07V3.37c0-.47.24-.87.6-1.07Z" fill="#00D7FE" />
      <path d="m16.6 15.3-3.3-3.3 3.3-3.3 3.97 2.26c.95.54.95 1.54 0 2.08L16.6 15.3Z" fill="#FFCE00" />
      <path d="M16.6 15.3 13.3 12l-9.7 9.7c.3.17.68.17 1.04-.03L16.6 15.3Z" fill="#FF3A44" />
      <path d="M16.6 8.7 4.64 2.33c-.36-.2-.74-.2-1.04-.03L13.3 12l3.3-3.3Z" fill="#00F076" />
    </svg>
  )
}

const BUTTON =
  'inline-flex h-14 items-center gap-3 rounded-2xl border border-white/15 bg-black px-5 text-left text-white transition hover:bg-white/10'

// Links to both stores. Used in the hero and at the end of the landing page.
export default function StoreButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={APP_STORE_URL} className={BUTTON} target="_blank" rel="noopener noreferrer">
        <AppleLogo />
        <span className="leading-tight">
          <span className="block text-[11px] text-slate-300">Download on the</span>
          <span className="block text-base font-semibold">App Store</span>
        </span>
      </a>
      <a href={GOOGLE_PLAY_URL} className={BUTTON} target="_blank" rel="noopener noreferrer">
        <PlayLogo />
        <span className="leading-tight">
          <span className="block text-[11px] text-slate-300">Get it on</span>
          <span className="block text-base font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  )
}
