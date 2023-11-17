import { useState, useEffect } from 'react'
import { format as formatTime } from 'date-fns'
import { LightningTime, MILLIS_PER_CHARGE } from '../time'
import { Colors } from '../types'

export function useLightningTimeClock() {
  const [lightningTimeClock, setLightningTime] = useState<string>('0~0~0')
  const [normalTimeClock, setNormalTime] = useState<string>('12:00 AM')
  const [timeColors, setTimeColors] = useState<Colors>({
    boltColor: '#ffffff',
    zapColor: '#ffffff',
    sparkColor: '#ffffff'
  })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const millis =
        1000 * 60 * 60 * now.getHours() +
        1000 * 60 * now.getMinutes() +
        1000 * now.getSeconds() +
        now.getMilliseconds()
      let remainingMillis = MILLIS_PER_CHARGE - (millis % MILLIS_PER_CHARGE)

      const lt = new LightningTime()
      const convertedTime = lt.convertToLightning(now).lightningString
      const colors = lt.getColors(convertedTime)
      setLightningTime(convertedTime)
      setTimeColors(colors)

      const formattedTime = formatTime(now, 'h:mm a')
      setNormalTime(formattedTime)
      setTimeout(update, remainingMillis)
    }
    update()
  }, [])

  return { lightningTimeClock, timeColors, normalTimeClock }
}
