import {
  convertToLightning,
  convertFromLightning,
  getColors
} from '../src/index'

describe('to lightning', () => {
  it('should convert to lightning', () => {
    const time = new Date()
    time.setHours(12)
    time.setMinutes(0)
    time.setSeconds(0)
    const convert = convertToLightning(time)
    expect(convert.lightningString).toEqual('8~0~0')
  })
})

describe('from lightning', () => {
  it('should convert from lightning', () => {
    const convert = convertFromLightning('8~0~0')
    expect(convert.withSeconds).toEqual('12:00:00 PM')
    expect(convert.withoutSeconds).toEqual('12:00 PM')
    expect(convert.lightningString).toEqual('8~0~0')
  })
  it('should convert frm lightning with charges', () => {
    const convert = convertFromLightning('8~0~0|a')
    expect(convert.withSeconds).toEqual('12:00:13 PM')
    expect(convert.withoutSeconds).toEqual('12:00 PM')
    expect(convert.lightningString).toEqual('8~0~0|a')
  })
  it('should throw an error when time format is incorrect', () => {
    expect(() => convertFromLightning('8~0|')).toThrow(
      'lightning string 8~0| is in an invalid format'
    )
  })
})

describe('get colors', () => {
  it('should get colors', () => {
    const colors = getColors('8~0~0')
    expect(colors).toMatchObject({
      boltColor: '80a100',
      zapColor: '3200d6',
      sparkColor: 'f68500'
    })
  })
  it('should throw an error when time format is incorrect', () => {
    expect(() => getColors('8~0|')).toThrow(
      'lightning string 8~0| is in an invalid format'
    )
  })
})
