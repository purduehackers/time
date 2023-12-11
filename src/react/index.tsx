import { useState, useEffect } from 'react'
import { format as formatTime } from 'date-fns'
import { LightningTime, MILLIS_PER_CHARGE } from '../time'
import type { LightningTimeClock } from '../types'

function calculateInitialTime(): LightningTimeClock {
  const now = new Date()
  const lightningTime = new LightningTime().convertToLightning(now)
  const formattedNormalTime = formatTime(now, 'h:mm a')

  return {
    ...lightningTime,
    formattedNormalTime
  }
}

export function useLightningTimeClock() {
  const initialTime = calculateInitialTime()
  const [lightningTimeClock, setLightningTimeClock] =
    useState<LightningTimeClock>(initialTime)

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
      const convertedTime = lt.convertToLightning(now)
      const formattedNormalTime = formatTime(now, 'h:mm a')

      setLightningTimeClock({
        ...convertedTime,
        formattedNormalTime
      })

      setTimeout(update, remainingMillis)
    }
    update()
  }, [])

  return lightningTimeClock
}
