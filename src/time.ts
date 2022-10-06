import rgbHex from 'rgb-hex'
import getParts from './utils/get-parts'
import msToTime from './utils/ms-to-time'
import validate from './utils/validate'

export class LightningTime {
  convertToLightning(time: Date): LightningString {
    const millisPerSpark = 21093.75 // 86400000 / 16^3

    const millis =
      1000 * 60 * 60 * time.getHours() +
      1000 * 60 * time.getMinutes() +
      1000 * time.getSeconds() +
      time.getMilliseconds()
    const totalSparks = millis / millisPerSpark
    const totalZaps = totalSparks / 16
    const totalBolts = totalZaps / 16

    const sparks = Math.floor(totalSparks) % 16
    const zaps = Math.floor(totalZaps) % 16
    const bolts = Math.floor(totalBolts) % 16

    const lightningString =
      bolts.toString(16) + '~' + zaps.toString(16) + '~' + sparks.toString(16)
    const colors = this.getColors(lightningString)
    return {
      lightningString,
      colors,
      originalTimeString: time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      })
    }
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

    return msToTime(millis, lightningString)
  }

  getColors(lightningString: string): Colors {
    const isValid = validate(lightningString)
    if (!isValid) {
      throw new Error(
        `lightning string ${lightningString} is in an invalid format`
      )
    }

    const { bolts, zaps, sparks, charges } = getParts(lightningString)
    const boltColor = rgbHex(bolts * 16 + zaps, 161, 0)
    const zapColor = rgbHex(50, zaps * 16 + sparks, 214)
    const sparkColor = rgbHex(246, 133, sparks * 16 + charges)

    return {
      boltColor,
      zapColor,
      sparkColor
    }
  }
}
