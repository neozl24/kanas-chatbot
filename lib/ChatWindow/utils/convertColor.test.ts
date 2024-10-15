import { convertToRgba } from './convertColor'

describe('convertColor function', () => {
  it('should convert hex color to rgba', () => {
    expect(convertToRgba('#333')).toBe('rgba(51, 51, 51, 0.8)')
    expect(convertToRgba('#ff5733')).toBe('rgba(255, 87, 51, 0.8)')
  })
  it('should convert rgb color to rgba', () => {
    expect(convertToRgba('rgb(150,77,50)')).toBe('rgba(150, 77, 50, 0.8)')
  })
  it('should convert rgba color to rgba with alpha 0.8', () => {
    expect(convertToRgba('rgba(120,88,32, 0.9)')).toBe('rgba(120, 88, 32, 0.8)')
  })
  it('should return the same color if param is not expected format', () => {
    expect(convertToRgba('blue')).toBe('blue')
  })
})