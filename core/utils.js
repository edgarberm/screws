/**
 * @public
 * html
 */
export function html(strings, ...props) {
  const parsed = strings.reduce((result, string, index) => {
    return index === strings.length - 1
      ? result + string // Last string,only add the fagment
      : result + string + props[index] // Add the fragment and the interpolated value
  }, '')

  return parsed
}

/** @public */
export const css = html

// Improving performance
export function parseListener(listener) {
  if (listener.startsWith('() =>')) {
    const matches = listener.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)/)

    if (matches && matches.length === 3) {
      const name = matches[1].trim()
      const args = matches[2].split(',')
      return { name, args }
    }
  } else {
    const name = listener.split('(')[0]
    const args = getArgumentsFromString(name).split(',')
    return { name, args }
  }
}

export function getArgumentsFromString(string) {
  const start = string.indexOf('(') + 1
  const end = string.lastIndexOf(')')

  return string.substring(start, end)
}

/**
 * @public
 * Woop 🍿
 */
export function dashify(camel) {
  return camel.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export const shortID = () => Math.random().toString(36).slice(2, 6) + '_'
