const validate = (lightningString: string) => {
  const tildeCount = (lightningString.match(/~/g) || []).length
  const validCharacters = /[0-9a-f]+$/g.test(
    lightningString.replace('~', '').replace('|', '')
  )
  const correctLength = lightningString.includes('|') ? 7 : 5
  return (
    tildeCount === 2 &&
    lightningString.length === correctLength &&
    validCharacters
  )
}

export default validate
