import { useState, useEffect } from 'preact/hooks'
import { useLightningTimeClockCore } from '../use-lightning-time-clock'

export function useLightningTimeClock() {
  return useLightningTimeClockCore({ useState, useEffect })
}
