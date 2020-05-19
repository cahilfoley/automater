export const keyBy = <T extends Record<string, any>, K extends keyof T>(
  objects: T[],
  key: K
): Record<T[K], T> => {
  const output: Partial<Record<T[K], T>> = {}

  for (const object of objects) {
    const outputKey = object[key]
    output[outputKey] = object
  }

  return output as Record<T[K], T>
}

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))
