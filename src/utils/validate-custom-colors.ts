const validateCustomColors = (
  boltColors: number[],
  zapColors: number[],
  sparkColors: number[]
): void => {
  const all = boltColors.concat(zapColors).concat(sparkColors)
  if (all.length !== 6) {
    throw new Error('Custom colors must have a length of 2.')
  }
  if (all.some((color) => color < 0 || color > 255)) {
    throw new Error('Color values must be between 0 and 255 (RGB).')
  }
}

export default validateCustomColors
