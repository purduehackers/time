export interface LightningString {
  lightningString: string
  strippedCharges: string
  colors: Colors
  parts: LightningTimeParts
}

export interface LightningTimeObject {
  bolts: number
  zaps: number
  sparks: number
  charges: number
  toString: Function
}

export interface LightningTimeParts {
  bolts: string
  zaps: string
  sparks: string
  charges: string
}

export interface TraditionalTimeString {
  withSeconds: string
  withoutSeconds: string
  date: Date
}

export interface Colors {
  boltColor: string
  zapColor: string
  sparkColor: string
}
export interface StaticColors {
  boltColors: number[]
  zapColors: number[]
  sparkColors: number[]
}

export type LightningTimeClock = LightningString & {
  formattedNormalTime: string
}
