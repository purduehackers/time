/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react'
import { LightningTime } from '../../src'
import { format } from 'date-fns'
import { useLightningTimeClock } from '../../src/react'

describe('react clock', () => {
  const { result } = renderHook(() => useLightningTimeClock())
  const now = new Date()
  const lt = new LightningTime()
  const { lightningString, colors } = lt.convertToLightning(now)
  const formattedNowString = format(now, 'h:mm a')

  it('renders the hook', () => {
    expect(result.current).toBeDefined()
  })
  it('renders the correct lightning time string', () => {
    expect(result.current.lightningString).toEqual(lightningString)
  })
  it('renders the correct formatted normal time', () => {
    expect(result.current.formattedNormalTime).toEqual(formattedNowString)
  })
  it('renders the correct colors', () => {
    const { boltColor, zapColor, sparkColor } = result.current.colors
    expect(boltColor).toEqual(colors.boltColor)
    expect(zapColor).toEqual(colors.zapColor)
    expect(sparkColor).toEqual(colors.sparkColor)
  })
})