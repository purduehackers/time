interface LightningString {
  lightningString: string
  colors: Colors
  originalTimeString?: string
}

interface LightningTimeObject {
  bolts: number
  zaps: number
  sparks: number
  charges: number
}

interface TraditionalTimeString {
  withSeconds: string
  withoutSeconds: string
  lightningString?: string
}

interface Colors {
  boltColor: string
  zapColor: string
  sparkColor: string
}
