import { LightningTime } from '../src'

const lightningTime = new LightningTime()
const time = lightningTime.convertToLightning(new Date())
console.log('time string:', time.lightningString)
