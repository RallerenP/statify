import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  getRandom() {
    return Math.round(Math.random() * 10000);
  }

  getRandomArray() {
    return [generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()]
  }
}

//Generate random number from 0 to 10
let generateRandomNumber = () => {
  return Math.round(Math.random() * 10)
}
