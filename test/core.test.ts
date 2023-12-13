import { LightningTime } from '../src/index'

describe('core library', () => {
  describe('to lightning', () => {
    it('should convert to lightning', () => {
      const time = new Date()
      time.setHours(12)
      time.setMinutes(0)
      time.setSeconds(0)
      const lightningTime = new LightningTime()
      const convert = lightningTime.convertToLightning(time)
      expect(convert.lightningString).toEqual('8~0~0|0')
    })
    it('should convert to lightning and get stripped charges', () => {
      const time = new Date()
      time.setHours(12)
      time.setMinutes(0)
      time.setSeconds(0)
      const lightningTime = new LightningTime()
      const convert = lightningTime.convertToLightning(time)
      expect(convert.strippedCharges).toEqual('8~0~0')
    })
    it('should convert to lightning and get colors', () => {
      const time = new Date()
      time.setHours(12)
      time.setMinutes(0)
      time.setSeconds(0)
      const lightningTime = new LightningTime()
      const convert = lightningTime.convertToLightning(time)
      expect(convert.colors).toMatchObject({
        boltColor: '#80a100',
        zapColor: '#3200d6',
        sparkColor: '#f68500'
      })
    })
  })

  describe('get parts', () => {
    it('should get parts', () => {
      const lt = new LightningTime()
      const parts = lt.getParts('8~0~0|e')
      expect(parts).toMatchObject({
        bolts: '8',
        zaps: '0',
        sparks: '0',
        charges: 'e'
      })
    })
  })

  describe('strip charges', () => {
    it('should strip charges after conversion', () => {
      const time = new Date()
      time.setHours(12)
      time.setMinutes(1)
      time.setSeconds(9)
      time.setMilliseconds(0)
      const lt = new LightningTime()
      const convert = lt.convertToLightning(time)
      expect(convert.lightningString).toEqual('8~0~3|4')
      const strip = convert.strippedCharges
      expect(strip).toEqual('8~0~3')
    })
    it('should strip charges', () => {
      const lt = new LightningTime()
      const strip = lt.stripCharges('8~0~0|e')
      expect(strip).toEqual('8~0~0')
    })
  })

  describe('from lightning', () => {
    const lightningTime = new LightningTime()
    it('should convert from lightning', () => {
      const convert = lightningTime.convertFromLightning('8~0~0')

      const expectedDate = new Date()
      expectedDate.setHours(12)
      expectedDate.setMinutes(0)
      expectedDate.setSeconds(0)
      expectedDate.setMilliseconds(0)

      expect(convert.getTime()).toEqual(expectedDate.getTime())
    })
    it('should convert from lightning with charges', () => {
      const convert = lightningTime.convertFromLightning('8~0~0|a')
      const expectedDate = new Date()

      expectedDate.setHours(12)
      expectedDate.setMinutes(0)
      expectedDate.setSeconds(13)
      expectedDate.setMilliseconds(183)

      expect(convert.getTime()).toEqual(expectedDate.getTime())
    })
    it('should throw an error when time format is incorrect', () => {
      expect(() => lightningTime.convertFromLightning('8~0|')).toThrow(
        'lightning string 8~0| is in an invalid format'
      )
    })
  })

  describe('get colors', () => {
    const lightningTime = new LightningTime()
    it('should get colors', () => {
      const colors = lightningTime.getColors('8~1~a')
      expect(colors).toMatchObject({
        boltColor: '#81a100',
        zapColor: '#321ad6',
        sparkColor: '#f685a0'
      })
    })
    it('should get colors with charge', () => {
      const colors = lightningTime.getColors('8~1~a|e')
      expect(colors).toMatchObject({
        boltColor: '#81a100',
        zapColor: '#321ad6',
        sparkColor: '#f685ae'
      })
    })
    it('should get colors with custom colors set', () => {
      const lt2 = new LightningTime({
        staticBoltColors: [120, 240],
        staticZapColors: [130, 130],
        staticSparkColors: [50, 206]
      })
      const colors = lt2.getColors('8~1~a')
      expect(colors).toMatchObject({
        boltColor: '#8178f0',
        zapColor: '#821a82',
        sparkColor: '#32cea0'
      })
    })
    it('should get colors with only some custom colors set', () => {
      const lt2 = new LightningTime({
        staticBoltColors: [120, 240],
        staticZapColors: [130, 130]
      })
      const colors = lt2.getColors('8~1~a')
      expect(colors).toMatchObject({
        boltColor: '#8178f0',
        zapColor: '#821a82',
        sparkColor: '#f685a0'
      })
    })
    it('should throw an error when a custom time array is invalid', () => {
      expect(
        () =>
          new LightningTime({
            staticBoltColors: [120]
          })
      ).toThrow('Custom colors must have a length of 2.')

      expect(() => {
        new LightningTime({
          staticBoltColors: [120, 130, 140, 150]
        })
      }).toThrow('Custom colors must have a length of 2.')

      expect(() => {
        new LightningTime({
          staticBoltColors: [120, 300]
        })
      }).toThrow('Color values must be integer values between 0 and 255 (RGB).')

      expect(() => {
        new LightningTime({
          staticBoltColors: [120.5, 130.5]
        })
      }).toThrow('Color values must be integer values between 0 and 255 (RGB).')
    })
    it('should throw an error when time format is incorrect', () => {
      expect(() => lightningTime.getColors('8~0|')).toThrow(
        'lightning string 8~0| is in an invalid format'
      )
    })
  })

  describe('set colors', () => {
    it('should set custom colors after initialization', () => {
      const lt = new LightningTime()
      const colors = lt.getColors('8~1~a')
      expect(colors).toMatchObject({
        boltColor: '#81a100',
        zapColor: '#321ad6',
        sparkColor: '#f685a0'
      })

      lt.setStaticColors({
        staticBoltColors: [120, 240]
      })
      const colors2 = lt.getColors('8~1~a')
      expect(colors2).toMatchObject({
        boltColor: '#8178f0',
        zapColor: '#321ad6',
        sparkColor: '#f685a0'
      })
    })
  })
})
