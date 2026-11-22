// The SportPath mark: a kit bag on a mint tile. Decorative, so the site name
// next to it carries the meaning.
export default function BrandMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#E3F4EA] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/sportpath-mark.svg" alt="" className="h-[118%] w-[118%] max-w-none" />
    </span>
  )
}
