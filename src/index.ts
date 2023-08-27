export default function VDFparse(VDFstring: string): object {
  let result = {}
  let value = ''
  let isKey = true // used for indicate type value
  let isValue = false // used to indicate the beginning of a line
  let keyOrder: string[] = []

  for (let char of VDFstring) {
    if (char === '\"') {
      isValue = !isValue

      if (isValue === false) {
        if (isKey) {
          keyOrder.push(value)
        }
        else {
          keyOrder.reduce((acc: {[key: string]: any}, key, index) => {
            if (index === keyOrder.length - 1) {
              acc[key] = !isNaN(Number(value)) ? Number(value) : value
            }
            else {
              acc[key] = acc[key] || {}
            }
            return acc[key]
          }, result)
          keyOrder.pop()
        }
        value = ''
        isKey = !isKey
      }
    }
    else if (char === '{' || char === '}') {
      char === '}' && keyOrder.pop()
      isKey = true
    }
    else if (isValue) {
      value += char
    }
  }
  return result
}