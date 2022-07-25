import { Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { Request } from 'express';
import * as rawbody from 'raw-body';

@Controller()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  @HttpCode(200)
  async calculate(@Req() request: Request): Promise<number> {
    const rawReq = await rawbody(request);
    const input = rawReq.toString().trim();
    console.log(input);
    const result = this.calculatorService.calculate(input);
    return result;
  }
}
