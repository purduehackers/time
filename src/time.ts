import rgbHex from 'rgb-hex'
import getParts from './utils/get-parts'
import msToTime from './utils/ms-to-time'
import validate from './utils/validate-lightning-string'
import validateCustomColors from './utils/validate-custom-colors'
import stripCharges from './utils/strip-charges'

export class LightningTime {
  staticColors: StaticColors

  constructor(customColors?: {
    staticBoltColors?: number[]
    staticZapColors?: number[]
    staticSparkColors?: number[]
  }) {
    const boltColors = customColors?.staticBoltColors || [161, 0]
    const zapColors = customColors?.staticZapColors || [50, 214]
    const sparkColors = customColors?.staticSparkColors || [246, 133]
    validateCustomColors(boltColors, zapColors, sparkColors)

    this.staticColors = { boltColors, zapColors, sparkColors }
  }

  setStaticColors(customColors?: {
    staticBoltColors?: number[]
    staticZapColors?: number[]
    staticSparkColors?: number[]
  }) {
    const boltColors =
      customColors?.staticBoltColors || this.staticColors.boltColors
    const zapColors =
      customColors?.staticZapColors || this.staticColors.zapColors
    const sparkColors =
      customColors?.staticSparkColors || this.staticColors.sparkColors
    validateCustomColors(boltColors, zapColors, sparkColors)

    this.staticColors = { boltColors, zapColors, sparkColors }
  }

  convertToLightning(time: Date): LightningString {
    const millisPerCharge = 1318.359375 // 86400000 / 16^4

    const millis =
      1000 * 60 * 60 * time.getHours() +
      1000 * 60 * time.getMinutes() +
      1000 * time.getSeconds() +
      time.getMilliseconds()
    const totalCharges = millis / millisPerCharge
    const totalSparks = totalCharges / 16
    const totalZaps = totalSparks / 16
    const totalBolts = totalZaps / 16

    const charges = Math.floor(totalCharges) % 16
    const sparks = Math.floor(totalSparks) % 16
    const zaps = Math.floor(totalZaps) % 16
    const bolts = Math.floor(totalBolts) % 16

    const lightningString =
      bolts.toString(16) +
      '~' +
      zaps.toString(16) +
      '~' +
      sparks.toString(16) +
      (charges > 0 ? '|' + charges.toString(16) : '')
    return {
      lightningString,
      strippedCharges: stripCharges(lightningString)
    }
  }

  stripCharges(lightningString: string) {
    return stripCharges(lightningString)
  }

  convertFromLightning(lightningString: string): TraditionalTimeString {
    const isValid = validate(lightningString)
    if (!isValid) {
      throw new Error(
        `lightning string ${lightningString} is in an invalid format`
      )
    }

    const { bolts, zaps, sparks, charges } = getParts(lightningString)

    let elapsed = (bolts * 16 + zaps) * 16 + sparks
    if (charges > 0) {
      elapsed = elapsed * 16 + charges
    }
    const millis = (elapsed * 86400000) / (charges > 0 ? 65536 : 4096)

    return msToTime(millis)
  }

  getColors(lightningString: string): Colors {
    const isValid = validate(lightningString)
    if (!isValid) {
      throw new Error(
        `lightning string ${lightningString} is in an invalid format`
      )
    }

    const { bolts, zaps, sparks, charges } = getParts(lightningString)
    const staticColors = this.staticColors
    const boltColor = rgbHex(
      bolts * 16 + zaps,
      staticColors.boltColors[0],
      staticColors.boltColors[1]
    )
    const zapColor = rgbHex(
      staticColors.zapColors[0],
      zaps * 16 + sparks,
      staticColors.zapColors[1]
    )
    const sparkColor = rgbHex(
      staticColors.sparkColors[0],
      staticColors.sparkColors[1],
      sparks * 16 + charges
    )

    return {
      boltColor,
      zapColor,
      sparkColor
    }
  }
}
