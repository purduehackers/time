import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { format as formatTime } from 'date-fns'
import { LightningTime, MILLIS_PER_CHARGE } from '../time'
import { Colors } from '../types'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useLightningTimeClock() {
  const [lightningTimeClock, setLightningTime] = useState<string>('')
  const [normalTimeClock, setNormalTime] = useState<string>('')
  const [timeColors, setTimeColors] = useState<Colors>({
    boltColor: '',
    zapColor: '',
    sparkColor: ''
  })
  const isFirstRender = useRef(true)

  useIsomorphicLayoutEffect(() => {
    if (isFirstRender.current) {
      const now = new Date()
      const { lightningString, colors } =
        new LightningTime().convertToLightning(now)
      const formattedTime = formatTime(now, 'h:mm a')

      setLightningTime(lightningString)
      setNormalTime(formattedTime)
      setTimeColors(colors)

      isFirstRender.current = false
    }
  }, [])

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
      const formattedTime = formatTime(now, 'h:mm a')
      const colors = lt.getColors(convertedTime)

      setLightningTime(convertedTime)
      setTimeColors(colors)
      setNormalTime(formattedTime)

      setTimeout(update, remainingMillis)
    }
    update()
  }, [])

  return { lightningTimeClock, timeColors, normalTimeClock }
}
