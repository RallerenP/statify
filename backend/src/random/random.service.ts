import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  getRandom() {
    return Math.round(Math.random() * 10000);
  }
}
