interface LightningString {
  lightningString: string
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

interface BoltValues {
  bolt1: number
  bolt2: number
}
interface ZapValues {
  zap1: number
  zap2: number
}
interface SparkValues {
  spark1: number
  spark2: number
}

interface StaticColors {
  boltColors: BoltValues
  zapColors: ZapValues
  sparkColors: SparkValues
}
