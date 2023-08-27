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
export function getListenerInfo(listener) {
  const name = listener.split('(')[0]
  const args = getArgumentsFromString(listener).split(',')

  return [name, args]
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