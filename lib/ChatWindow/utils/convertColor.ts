/**
 * convert theme color to rgba format, and set opacity to 0.8
 */
export const convertToRgba = (color: string) => {
  const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  const rgbRegex = /^(rgb|rgba)\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*(0|1|0?\.\d+))?\)$/

  if (hexRegex.test(color)) {
    let hex = color.replace(/^#/, '')
    if (hex.length === 3) {
      // transform to 6 digit hex string
      hex = hex.split('').map(x => x + x).join('')
    }
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, 0.8)`

  } else if (rgbRegex.test(color)) {
    const rgbaMatch = color.match(rgbRegex)
    if (rgbaMatch) {
      const r = rgbaMatch[2]
      const g = rgbaMatch[3]
      const b = rgbaMatch[4]
      return `rgba(${r}, ${g}, ${b}, 0.8)`
    }
  }

  // not expected format
  return color
}