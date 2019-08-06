export function randomChartList(size, unit) {
  let list = []
  if (size > 0) {
    for (let i = 0; i < size; i++) {
      list[i] = {
        value: Math.ceil(Math.random() * 100),
        unit: unit
      }
    }
  }
  return list
}

export function randomArray(size) {
  let list = []
  if (size > 0) {
    for (let i = 0; i < size; i++) {
      list[i] = Math.ceil(Math.random() * 100)
    }
  }
  return list
}