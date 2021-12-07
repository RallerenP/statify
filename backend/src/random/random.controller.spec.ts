import { TileTypes } from './../tile/schemas/tile.schema';
import { RandomController } from './random.controller'
import { RandomService } from './random.service'

describe('Random Controller', () => {
  let randomController: RandomController;
  let randomService: RandomService;

  beforeEach(() => {
    randomService = new RandomService()
    randomController = new RandomController(randomService)
  })

  describe('getRandom()', () => {
    it('Should return an object containing a random value', async () => {
      const result = randomService.getRandom()
      const expectedCompatible = [TileTypes.Number]
      jest.spyOn(randomService, 'getRandom').mockImplementation(() => result);

      expect(await randomController.getRandom().value).toBe(result)
      expect(await randomController.getRandom().description).toBe('A random number')
      expect(await randomController.getRandom().compatible).toEqual(expect.arrayContaining(expectedCompatible))
    })
  })

  describe('simpleChart()', () => {
    it('Should return an object containing a object of random labels and random numbers', async () => {
      const result = randomService.getLabelsAndNumbers()
      const expectedCompatible = [TileTypes.BarChart, TileTypes.LineChart, TileTypes.PieChart]
      jest.spyOn(randomService, 'getLabelsAndNumbers').mockImplementation(() => result)

      expect(await randomController.getLabelsAndNumbers().value.labels).toEqual(expect.arrayContaining(result.labels))
      expect(await randomController.getLabelsAndNumbers().value.numbers).toEqual(expect.arrayContaining(result.numbers))
      expect(await randomController.getLabelsAndNumbers().description).toBe('An object of an array with random labels, and an array of random numbers')
      expect(await randomController.getLabelsAndNumbers().compatible).toEqual(expect.arrayContaining(expectedCompatible))

    })
  })

  describe('advancedChart()', () => {
    it('Should return an object containing an array of objects with x and y coordinates', async () => {
      const result = randomService.getRandomScatterPoints()
      const expectedCompatible = [TileTypes.ScatterChart]
      jest.spyOn(randomService, 'getRandomScatterPoints').mockImplementation(() => result)

      expect(await randomController.getRandomScatterPoints().value).toEqual(expect.arrayContaining(result))
      expect(await randomController.getRandomScatterPoints().description).toBe('An array of random scatter points objects')
      expect(await randomController.getRandomScatterPoints().compatible).toEqual(expect.arrayContaining(expectedCompatible))

    })
  })

  describe('onOff()', () => {
    it('Should return an object containing an array of objects with x and y coordinates', async () => {
      const result = randomService.getRandomOnOff()
      const expectedCompatible = [TileTypes.OnOff]
      jest.spyOn(randomService, 'getRandomOnOff').mockImplementation(() => result)

      expect(await randomController.getRandomOnOff().value.text).toEqual(result.text)
      expect(await randomController.getRandomOnOff().value.state).toEqual(result.state)
      expect(await randomController.getRandomOnOff().description).toBe('Show whether a service is offline or online')
      expect(await randomController.getRandomOnOff().compatible).toEqual(expect.arrayContaining(expectedCompatible))

    })
  })

  describe('ui()', () => {
    it('Should return an UI object', async () => {
      const result = randomController.getUi()
      const expectedCompatible = [TileTypes.Divider, TileTypes.Header, TileTypes.Description]
      jest.spyOn(randomController, 'getUi').mockImplementation(() => result)

      expect(await randomController.getUi().value).toEqual(result.value)
      expect(await randomController.getUi().description).toBe('A very descriptive description')
      expect(await randomController.getUi().compatible).toEqual(expect.arrayContaining(expectedCompatible))

    })
  })


})