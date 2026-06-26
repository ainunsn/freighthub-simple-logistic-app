export function generateTrackingNumber(): string {
  const now = Date.now().toString().slice(-8)

  const random = Math.random().toString(36).substring(2, 6).toUpperCase()

  return `FH${now}${random}`
}
