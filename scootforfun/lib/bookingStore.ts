// TODO: Replace with a real database. This in-memory store resets on every cold-start.

const store = new Map<string, number>()

function key(date: string, windowId: string, slot: string) {
  return `${date}:${windowId}:${slot}`
}

export function getBooked(date: string, windowId: string, slot: string): number {
  return store.get(key(date, windowId, slot)) ?? 0
}

export function incrementBooked(date: string, windowId: string, slot: string, count: number) {
  const k = key(date, windowId, slot)
  store.set(k, (store.get(k) ?? 0) + count)
}
