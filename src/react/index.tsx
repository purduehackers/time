import { useState, useEffect } from 'react'
import { useLightningTimeClockCore } from '../use-lightning-time-clock'

export function useLightningTimeClock() {
  return useLightningTimeClockCore({ useState, useEffect })
}
