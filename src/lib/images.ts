// Real photography for the landing carousel: hand-picked Unsplash shots, since
// generated imagery of athletes lands in uncanny valley at full-bleed size.
export const HERO_IMAGES = [
  { id: '1530549387789-4c1017266635', caption: 'Swimming' },
  { id: '1570456824246-bd6d13126fc4', caption: 'Boxing' },
  { id: '1779104782112-3c890f523ec5', caption: 'Running' },
  { id: '1560272564-c83b66b1ad12', caption: 'Football' },
  { id: '1636581563867-1ecab574858f', caption: 'Training' },
  { id: '1519315901367-f34ff9154487', caption: 'Swimming' },
]

export function unsplash(id: string, width = 1920) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`
}

// Track cover art is generated per activity+goal so every track looks distinct.
// Prompts deliberately avoid close-up faces and specific technique, which is
// where image models produce anatomically wrong results.
export function trackCover(activityName: string, goal: string, width = 1200) {
  const prompt = [
    `cinematic wide editorial photograph representing ${activityName}`,
    `mood of "${goal}"`,
    'athletic environment, dramatic moody lighting, deep shadows, teal and dark slate palette',
    'shot from distance or behind, no visible faces, no text, no logos',
  ].join(', ')

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${Math.round(width * 0.42)}&nologo=true&seed=${stableSeed(activityName + goal)}`
}

// A stable seed keeps a track's cover identical across renders.
function stableSeed(input: string) {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % 100000
}
