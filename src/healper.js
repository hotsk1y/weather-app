export const unique = (arr) => {
  let used = {}
  let filteredCities = arr.filter(function (obj) {
    return obj.id in used ? 0 : (used[obj.id] = 1)
  })
  return filteredCities
}
