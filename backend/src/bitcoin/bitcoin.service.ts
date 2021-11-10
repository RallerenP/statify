import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class BitcoinService {
  constructor(private httpService: HttpService) {}

  async getValue() {
    return this.httpService
      .get('https://api.blockchain.com/v3/exchange/tickers/BTC-USD')
      .pipe(map((response) => response.data.price_24h));
  }
}
