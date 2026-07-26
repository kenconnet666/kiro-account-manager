interface BootSplashDocument {
  getElementById?: (id: string) => {
    dataset: Record<string, string>
    remove: () => void
  } | null
}

export function dismissBootSplash(doc: BootSplashDocument = document) {
  const splash = doc?.getElementById?.('boot-splash')
  if (!splash) return false

  splash.dataset.state = 'hidden'
  splash.remove()
  return true
}
