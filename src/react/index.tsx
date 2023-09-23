import { useState, useEffect } from 'react'
import { format as formatTime } from 'date-fns'
import { LightningTime, MILLIS_PER_CHARGE } from '../time'

export function useLightningTimeClock() {
  const [lightningTimeClock, setLightningTime] = useState('')
  const [normalTimeClock, setNormalTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()

      const lt = new LightningTime()
      const convertedTime = lt.convertToLightning(now).lightningString
      setLightningTime(convertedTime)

      const formattedTime = formatTime(now, 'h:mm a')
      setNormalTime(formattedTime)
    }

    update()

    const now = new Date()
    const millis =
      1000 * 60 * 60 * now.getHours() +
      1000 * 60 * now.getMinutes() +
      1000 * now.getSeconds() +
      now.getMilliseconds()
    const remainingMillis = MILLIS_PER_CHARGE - (millis % MILLIS_PER_CHARGE)

    const timer = setTimeout(() => {
      update()

      const interval = setInterval(update, MILLIS_PER_CHARGE)

      return () => clearInterval(interval)
    }, remainingMillis)
    return () => clearTimeout(timer)
  }, [])

  return { lightningTimeClock, normalTimeClock }
}
