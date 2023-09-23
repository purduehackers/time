import { useState, useEffect } from 'react'
import { format as formatTime } from 'date-fns'
import { LightningTime, MILLIS_PER_CHARGE } from '../time'

export function useLightningTimeClock() {
  const [lightningTimeClock, setLightningTime] = useState('')
  const [normalTimeClock, setNormalTime] = useState('')

  useEffect(() => {
    const now = new Date()
    const millis =
      1000 * 60 * 60 * now.getHours() +
      1000 * 60 * now.getMinutes() +
      1000 * now.getSeconds() +
      now.getMilliseconds()

    const remainingMillis = MILLIS_PER_CHARGE - (millis % MILLIS_PER_CHARGE)
    let nextExpectedUpdateTime = Date.now() + remainingMillis

    const update = () => {
      nextExpectedUpdateTime += MILLIS_PER_CHARGE

      const now = new Date()
      const lt = new LightningTime()
      const convertedTime = lt.convertToLightning(now).lightningString
      setLightningTime(convertedTime)

      const formattedTime = formatTime(now, 'h:mm a')
      setNormalTime(formattedTime)

      const drift = Date.now() - nextExpectedUpdateTime
      setTimeout(update, MILLIS_PER_CHARGE - drift)
    }

    setTimeout(update, remainingMillis)
  }, [])

  return { lightningTimeClock, normalTimeClock }
}
