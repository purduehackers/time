export interface LightningString {
  lightningString: string
  strippedCharges: string
  colors: Colors
}

export interface LightningTimeObject {
  bolts: number
  zaps: number
  sparks: number
  charges: number
}

export interface TraditionalTimeString {
  withSeconds: string
  withoutSeconds: string
  date: Date
  lightningString?: string
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
