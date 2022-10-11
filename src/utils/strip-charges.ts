import validate from './validate-lightning-string'

const stripCharges = (lightningString: string): string => {
  const isValid = validate(lightningString)
  if (!isValid) {
    throw new Error(
      `lightning string ${lightningString} is in an invalid format`
    )
  }
  return lightningString.split('|')[0] || lightningString
}

export default stripCharges
