import { LightningTime } from '../src/index'

describe('to lightning', () => {
  it('should convert to lightning', () => {
    const time = new Date()
    time.setHours(12)
    time.setMinutes(0)
    time.setSeconds(0)
    const lightningTime = new LightningTime()
    const convert = lightningTime.convertToLightning(time)
    expect(convert.lightningString).toEqual('8~0~0')
  })
})

describe('from lightning', () => {
  const lightningTime = new LightningTime()
  it('should convert from lightning', () => {
    const convert = lightningTime.convertFromLightning('8~0~0')
    expect(convert).toMatchObject({
      withSeconds: '12:00:00 PM',
      withoutSeconds: '12:00 PM'
    })
  })
  it('should convert from lightning with charges', () => {
    const convert = lightningTime.convertFromLightning('8~0~0|a')
    expect(convert).toMatchObject({
      withSeconds: '12:00:13 PM',
      withoutSeconds: '12:00 PM'
    })
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
      boltColor: '81a100',
      zapColor: '321ad6',
      sparkColor: 'f685a0'
    })
  })
  it('should get colors with charge', () => {
    const colors = lightningTime.getColors('8~1~a|e')
    expect(colors).toMatchObject({
      boltColor: '81a100',
      zapColor: '321ad6',
      sparkColor: 'f685ae'
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
      boltColor: '8178f0',
      zapColor: '821a82',
      sparkColor: '32cea0'
    })
  })
  it('should get colors with only some custom colors set', () => {
    const lt2 = new LightningTime({
      staticBoltColors: [120, 240],
      staticZapColors: [130, 130]
    })
    const colors = lt2.getColors('8~1~a')
    expect(colors).toMatchObject({
      boltColor: '8178f0',
      zapColor: '821a82',
      sparkColor: 'f685a0'
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
    }).toThrow('Color values must be between 0 and 255 (RGB).')
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
      boltColor: '81a100',
      zapColor: '321ad6',
      sparkColor: 'f685a0'
    })

    lt.setStaticColors({
      staticBoltColors: [120, 240]
    })
    const colors2 = lt.getColors('8~1~a')
    expect(colors2).toMatchObject({
      boltColor: '8178f0',
      zapColor: '321ad6',
      sparkColor: 'f685a0'
    })
  })
})
