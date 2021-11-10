import { BitcoinService } from './bitcoin.service';
import { Controller, Get } from '@nestjs/common';

@Controller('bitcoin')
export class BitcoinController {
  constructor(private readonly bitcoinService: BitcoinService) {}

  @Get('/value')
  getValue() {
    return this.bitcoinService.getValue();
  }
}
