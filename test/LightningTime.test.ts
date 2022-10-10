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
    expect(convert.withSeconds).toEqual('12:00:00 PM')
    expect(convert.withoutSeconds).toEqual('12:00 PM')
    expect(convert.lightningString).toEqual('8~0~0')
  })
  it('should convert frm lightning with charges', () => {
    const convert = lightningTime.convertFromLightning('8~0~0|a')
    expect(convert.withSeconds).toEqual('12:00:13 PM')
    expect(convert.withoutSeconds).toEqual('12:00 PM')
    expect(convert.lightningString).toEqual('8~0~0|a')
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
      boltColors: { bolt1: 120, bolt2: 240 },
      zapColors: { zap1: 130, zap2: 130 },
      sparkColors: { spark1: 50, spark2: 206 }
    })
    const colors = lt2.getColors('8~1~a')
    expect(colors).toMatchObject({
      boltColor: '8178f0',
      zapColor: '821a82',
      sparkColor: '32cea0'
    })
  })
  it('should throw an error when time format is incorrect', () => {
    expect(() => lightningTime.getColors('8~0|')).toThrow(
      'lightning string 8~0| is in an invalid format'
    )
  })
})
