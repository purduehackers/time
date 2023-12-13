export interface LightningString {
  lightningString: string
  strippedCharges: string
  colors: Colors
  parts: LightningTimeParts
}

export interface LightningTimeObject {
  bolts: number
  zaps: number
  sparks: number
  charges: number
  toString: Function
}

export interface LightningTimeParts {
  bolts: string
  zaps: string
  sparks: string
  charges: string
}

export interface Colors {
  boltColor: string
  zapColor: string
  sparkColor: string
}
export interface StaticColors {
  boltColors: number[]
  zapColors: number[]
  sparkColors: number[]
}

export type GenericUseState = <T>(
  initialState: T | (() => T)
) => [T, (newState: T | ((prevState: T) => T)) => void]
export type GenericUseEffect = (
  effect: () => void | (() => void | undefined),
  deps?: ReadonlyArray<any>
) => void
