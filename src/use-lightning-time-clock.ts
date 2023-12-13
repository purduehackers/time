import { format as formatTime } from 'date-fns'
import { LightningTime, MILLIS_PER_CHARGE } from './time'
import type { Colors, GenericUseEffect, GenericUseState } from './types'

function calculateInitialData() {
  const now = new Date()
  const { lightningString, colors } = new LightningTime().convertToLightning(
    now
  )
  const formattedNormalTime = formatTime(now, 'h:mm a')

  return {
    lightningString,
    formattedNormalTime,
    colors
  }
}

export function useLightningTimeClockCore({
  useState,
  useEffect
}: {
  useState: GenericUseState
  useEffect: GenericUseEffect
}) {
  const { lightningString, formattedNormalTime, colors } =
    calculateInitialData()
  const [lightningTimeClock, setLightningTime] =
    useState<string>(lightningString)
  const [normalTimeClock, setNormalTime] = useState<string>(formattedNormalTime)
  const [timeColors, setTimeColors] = useState<Colors>(colors)

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
