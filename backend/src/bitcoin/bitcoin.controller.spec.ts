import { HttpService } from "@nestjs/axios";
import { BitcoinController } from "./bitcoin.controller";
import { BitcoinService } from "./bitcoin.service";

describe('Bitcoin Controller', () => {

  let bitcoinController: BitcoinController;
  let bitcoinService: BitcoinService;

  beforeEach(() => {
    bitcoinService = new BitcoinService(new HttpService)
    bitcoinController = new BitcoinController(bitcoinService)
  })

  describe('getValue()', () => {
    it('Should return the current value of bitcoins', async () => {
      //Check if the value returned is somewhat near actual bitcoin value
      const result = bitcoinService.getValue()
      jest.spyOn(bitcoinService, 'getValue').mockImplementation(() => result);

      console.log(result)
    })
  })


})