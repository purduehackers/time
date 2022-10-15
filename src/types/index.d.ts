declare module '@purduehackers/time' {
  class LightningTime {
    staticColors: StaticColors
    constructor(customColors?: {
      staticBoltColors?: number[]
      staticZapColors?: number[]
      staticSparkColors?: number[]
    })
    setStaticColors(customColors?: {
      staticBoltColors?: number[]
      staticZapColors?: number[]
      staticSparkColors?: number[]
    }): void
    convertToLightning(time: Date): LightningString
    stripCharges(lightningString: string): string
    convertFromLightning(lightningString: string): TraditionalTimeString
    getColors(lightningString: string): Colors
  }

  export interface LightningString {
    lightningString: string
    strippedCharges: string
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

  export { LightningTime }
}
