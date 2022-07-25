import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    calculatorService = app.get<CalculatorService>(CalculatorService);
  });

  describe('main tests', () => {
    it('should return zero if string is empty', () => {
      const result = calculatorService.calculate('');
      expect(result).toBe(0);
    });
    it('should handle multiplication operation well', () => {
      const result = calculatorService.calculate('12354*75');
      expect(result).toBe(926550);
    });
    it('should handle division operation well', () => {
      const result = calculatorService.calculate('6752/844');
      expect(result).toBe(8);
    });
    it('should handle subtraction operation well', () => {
      const result = calculatorService.calculate('475836-844');
      expect(result).toBe(474992);
    });
    it('should handle sum operation well', () => {
      const result = calculatorService.calculate('32+1+999+4325');
      expect(result).toBe(5357);
    });
    it('should calculate digits with fraction correctly', () => {
      const result = calculatorService.calculate('0.7-1.5*8');
      expect(result).toBe(-11.3);
    });
    it('should calculate with prioritizing order', () => {
      const result = calculatorService.calculate('-123*4/-134+7-98*6');
      expect(result).toBe(-577.3283582089553);
    });
  });

  describe('extra tests', () => {
    it('should skip multiple signs', () => {
      const result = calculatorService.calculate('----30+10****4');
      expect(result).toBe(10);
    });
    it('should skip false zeros', () => {
      const result = calculatorService.calculate('03333+3');
      expect(result).not.toBe(1758);
      expect(result).toBe(3336);
    });
  });
});
