
const transformaArrayToObject = () => {}

export const objectify = (filter, labels, arrays) => {
  try{
    const filtered = []
    const indexOfMin = labels.indexOf(filter.yearStart)
    const indexOfMax = labels.indexOf(filter.yearEnd)

    arrays
      .filter(c => filter.names.includes(c[0]))
      .forEach(country => {
        const countryObj = {}
        const yearData = {}
        countryObj['name'] = country[0]

        for (let index = indexOfMin; index < indexOfMax; index++) {

          let element = null
          if(isNaN(parseInt(element))){
            element = parseFloat(country[index])
          } else {
            element = parseInt(country[index])
          }

          let label = labels[index]
          yearData[label] = element ? element : null
        }
        countryObj['data'] = yearData
        filtered.push(countryObj)
      })
    return filtered
  } catch (e) {
    ///
  }
}

const divideCo2byPop = (filter, labels, arr1, arr2) => {
  const countryObj = {}
  const yearData = {}
  countryObj['name'] = arr1[0]

  const indexOfMin = labels.indexOf(filter.yearStart)
  const indexOfMax = labels.indexOf(filter.yearEnd)

  for (let index = indexOfMin; index < indexOfMax; index++) {
    let element = null

    element = (parseFloat(arr1[index]) * 1000) / parseInt(arr2[index])


    let label = labels[index]
    yearData[label] = element ? element : null

    countryObj['data'] = yearData

  }
  return countryObj
}

export const divideCo2ByPopulation = (filter, labels, co2, population) => {
  const co2filtered = co2.filter(c => filter.names.includes(c[0]))
  const popfiltered = population.filter(c => filter.names.includes(c[0]))
  const result = []
  for (let index = 0; index < co2filtered.length; index++) {
    const countryCo2 = co2filtered[index]
    const countryPop = popfiltered[index]
    result.push(divideCo2byPop(filter, labels, countryCo2, countryPop))
  }
  return result
}


export default transformaArrayToObject