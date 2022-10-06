import { LightningTime } from '../src/index'

describe('to lightning', () => {
  it('should convert to lightning', () => {
    const lt = new LightningTime()
    const time = new Date()
    time.setHours(12)
    time.setMinutes(0)
    time.setSeconds(0)
    const convert = lt.convertToLightning(time)
    expect(convert.lightningString).toEqual('8~0~0')
  })
})

describe('from lightning', () => {
  it('should convert from lightning', () => {
    const lt = new LightningTime()
    const convert = lt.convertFromLightning('8~0~0')
    expect(convert.withSeconds).toEqual('12:00:00 PM')
    expect(convert.withoutSeconds).toEqual('12:00 PM')
    expect(convert.lightningString).toEqual('8~0~0')
  })
  it('should convert frm lightning with charges', () => {
    const lt = new LightningTime()
    const convert = lt.convertFromLightning('8~0~0|a')
    expect(convert.withSeconds).toEqual('12:00:13 PM')
    expect(convert.withoutSeconds).toEqual('12:00 PM')
    expect(convert.lightningString).toEqual('8~0~0|a')
  })
})

describe('get colors', () => {
  it('should get colors', () => {
    const lt = new LightningTime()
    const colors = lt.getColors('8~0~0')
    expect(colors).toMatchObject({
      boltColor: '80a100',
      zapColor: '3200d6',
      sparkColor: 'f68500',
    })
  })
})
