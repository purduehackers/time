import { LightningTimeObject, LightningTimeParts } from '../types'

const getParts = (lightningString: string): LightningTimeObject => {
  const lightningParts = lightningString.split('~')
  const bolts = parseInt(lightningParts[0], 16)
  const zaps = parseInt(lightningParts[1], 16)
  const sparks = parseInt(
    lightningString.includes('|')
      ? lightningParts[2].split('|')[0]
      : lightningParts[2],
    16
  )
  const charges = parseInt(lightningParts[2].split('|')[1], 16) || 0

  return {
    bolts,
    zaps,
    sparks,
    charges,
    toString: () =>
      toString({
        bolts,
        zaps,
        sparks,
        charges
      })
  }
}

const toString = (parts: LightningTimeObject): LightningTimeParts => {
  const bolts = parts.bolts.toString(16)
  const zaps = parts.zaps.toString(16)
  const sparks = parts.sparks.toString(16)
  const charges = parts.charges.toString(16)
  return {
    bolts,
    zaps,
    sparks,
    charges
  }
}

export default getParts
