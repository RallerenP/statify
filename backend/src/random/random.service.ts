import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  getRandom() {
    return Math.round(Math.random() * 10000);
  }

  getRandomArray() {
    return [generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()]
  }

  getLabelsAndNumbers() {
    // Labels, numbers
    return {
      labels: generateFiveRandomCountries(),
      numbers: generateFiveRandomNumbers()
    }
  }

  getRandomScatterPoints() {
    // Array of random points
    return generateRandomScatterPoints()
  }

  getRandomOnOff() {
    // Create a random on or off 'service'
    let random = Math.random()
    return {
      text: random > 0.5 ? 'Online' : 'Offline',
      state: random > 0.5 ? true : false
    }
  }
}

//Generate random number from 0 to 10
let generateRandomNumber = () => {
  return Math.round(Math.random() * 10)
}

//Retrieve 5 random numbers
let generateFiveRandomNumbers = () => {
  let numbers = []
  for (let i = 0; i < 5; i++) {
    numbers.push(Math.round(Math.random() * 100))
  }
  return numbers
}

const listOfCountries = [
  'Canada',
  'Nigeria',
  'Cook Islands',
  'Greece',
  'Pitcairn Islands',
  'Turkmenistan',
  'Barbados',
  'Liechtenstein',
  'Senegal',
  'El Salvador',
]

//Retrieve 5 random countries
let generateFiveRandomCountries = () => {
  let countries = []
  for (let i = 0; i < 5; i++) {
    let random = Math.round(Math.random() * 10)
    while (countries.includes(listOfCountries[random])) {
      random = Math.round(Math.random() * 10)
    }
    countries.push(listOfCountries[random])
  }
  
  return countries
}

let generateRandomScatterPoints = () => {
  let tmp = []
  for (let i = 0; i < 5; i++) {
    let x = Math.round(Math.random() * 10)
    let y = Math.round(Math.random() * 10)
    tmp.push({x, y})
  }
  return tmp
}




