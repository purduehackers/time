import React from "react";
import { useLightningTimeClock } from "../../src/react";

export function Clock() {
  const { lightningString, formattedNormalTime, colors } = useLightningTimeClock()
  const { boltColor, zapColor, sparkColor } = colors
  return (
    <div>
      <p data-testid="lightning string">{lightningString}</p>
      <p data-testid="formatted normal time">{formattedNormalTime}</p>
      <p data-testid="bolt color">{boltColor}</p>
      <p data-testid="zap color">{zapColor}</p>
      <p data-testid="spark color">{sparkColor}</p>
    </div>
  )
}