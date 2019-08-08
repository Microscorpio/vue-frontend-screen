export function randomChartList(size, unit) {
  let list = []
  if (size > 0) {
    for (let i = 0; i < size; i++) {
      list[i] = {
        value: randomNum(100),
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
      list[i] = randomNum(100)
    }
  }
  return list
}

export function randomNum(max) {
  if (max) {
    return Math.ceil(Math.random() * max)
  } else {
    return 0
  }
}

export const aqiDataColorList = ['#37dd8f', '#fea714', '#ee5b3a', '#ca011a', '#6008c5', '#621d0a']
export const aqiDataTypeList = ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']

export function airColor(data) {
  if (data >= 0 && data <= 50) return aqiDataColorList[0]
  if (data > 50 && data <= 100) return aqiDataColorList[1]
  if (data > 100 && data <= 150) return aqiDataColorList[2]
  if (data > 150 && data <= 200) return aqiDataColorList[3]
  if (data > 200 && data <= 300) return aqiDataColorList[4]
  if (data > 300) return aqiDataColorList[5]
}

export function airType(data) {
  if (data >= 0 && data <= 50) return aqiDataTypeList[0]
  if (data > 50 && data <= 100) return aqiDataTypeList[1]
  if (data > 100 && data <= 150) return aqiDataTypeList[2]
  if (data > 150 && data <= 200) return aqiDataTypeList[3]
  if (data > 200 && data <= 300) return aqiDataTypeList[4]
  if (data > 300) return aqiDataTypeList[5]
}
