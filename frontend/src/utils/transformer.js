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

        for (let index = indexOfMin; index <= indexOfMax; index++) {

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
//for co2/capita line chart
const divideCo2byPop = (filter, labels, arr1, arr2) => {
  const countryObj = {}
  const yearData = {}
  countryObj['name'] = arr1[0]

  const indexOfMin = labels.indexOf(filter.yearStart)
  const indexOfMax = labels.indexOf(filter.yearEnd)

  for (let index = indexOfMin; index <= indexOfMax; index++) {
    let element = null

    element = (parseFloat(arr1[index]) * 1000) / parseInt(arr2[index])


    let label = labels[index]
    yearData[label] = element ? element : null

    countryObj['data'] = yearData

  }
  return countryObj
}
///for co2/capita line chart
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

///this is for pie charts
export const emissionDividedByCapita = (year, co2, population) => {
  function yearMatch(anyyear){
    return anyyear === year || parseInt(anyyear) === year
  }
  const indexOfGivenYear = co2[6].findIndex(yearMatch)

  const getData = (countryIndex, statIndex) => {
    const countryco2 = co2[countryIndex]
    const countrypop = population[countryIndex]
    const dividedNumbers = parseInt(countryco2[statIndex]) * 1000 / parseFloat(countrypop[statIndex])
    return isNaN(dividedNumbers) ? null : dividedNumbers.toFixed(2)
  }

  const result = co2
    .map(
      (country, index) => country
        .map(
          (e, i) => (i === 0 ? e : getData(index, indexOfGivenYear))
        )
        .filter((e, i) => (i === 0 || i === indexOfGivenYear))
    )

  return result
}

export const top5 = (array) => {
  const result = array.sort((a,b) => b[1] - a[1]).filter((e, i) => i < 12 && i > 6)
  return result.map(e => e[1]).filter(e => e !== null).length > 0 ? result : []
}

export const searchCountries = (names, array) => array.filter(e => names.includes(e[0]))

export const checkIfContainsActualData = (array) => array.filter(e => e[1]).some(e => e !== null)
