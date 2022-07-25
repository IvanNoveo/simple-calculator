import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  private commonRegexp = /[^\+\-\*\/](?<signs>[\+\-\*\/])/g;
  private prioritizedRegexp = /[^\+\-\*\/]([\*\/])/g;
  private notPrioritizedRegexp = /[^\+\-\*\/]([\-\+])/g;

  calculate(input: string): number {
    input = this.makeCalculationSteps(input, true);
    input = this.makeCalculationSteps(input, false);
    return Number(input);
  }

  private makeCalculationSteps(
    rawFormula: string,
    isPrioritized: boolean,
  ): string {
    const mainRegexp = isPrioritized
      ? this.prioritizedRegexp
      : this.notPrioritizedRegexp;
    let match = mainRegexp.exec(rawFormula);
    while (match) {
      const idx = match.index + 1;

      let leftPart = this.extractLeftPart(rawFormula, idx);
      let rightPart = this.extractRightPart(rawFormula, idx + 1);
      const formulaForReplace = leftPart + rawFormula[idx] + rightPart;

      leftPart = this.clearFromDuplicateSigns(leftPart);
      rightPart = this.clearFromDuplicateSigns(rightPart);

      const stepResult = this.executeFormula(
        leftPart,
        rightPart,
        rawFormula[idx],
      );
      rawFormula = rawFormula.replace(formulaForReplace, stepResult);
      
      mainRegexp.lastIndex = 0;
      match = mainRegexp.exec(rawFormula);
    }
    return rawFormula;
  }

  private executeFormula(left: string, right: string, sign: string): string {
    const leftPart = Number(left);
    const rightPart = Number(right);
    let result: number;

    switch (sign) {
      case '+':
        result = leftPart + rightPart;
        break;
      case '-':
        result = leftPart - rightPart;
        break;
      case '/':
        result = leftPart / rightPart;
        break;
      case '*':
        result = leftPart * rightPart;
        break;
    }
    return result.toString();
  }

  private extractRightPart(input: string, startIdx: number): string {
    const subst = input.substring(startIdx, input.length);
    let match: RegExpExecArray;
    let idx = input.length;

    if ((match = this.commonRegexp.exec(subst))) {
      const sign = match.groups['signs'];
      idx = startIdx + subst.indexOf(sign);
    }
    return input.substring(startIdx, idx);
  }

  private extractLeftPart(input: string, idx: number): string {
    const subst = input.substring(0, idx);
    let match;
    let firstIdx = 0;
    
    while ((match = this.commonRegexp.exec(subst))) {
      firstIdx = this.commonRegexp.lastIndex;
    }
    return input.substring(firstIdx, idx);
  }

  private clearFromDuplicateSigns(input: string): string {
    input = input.replaceAll(/[\+\*\/]/g, '').replaceAll(/^[0]*/g, '');
    if (input.match(/\-/g)?.length > 1) {
      input = '-' + input.replaceAll(/\-/g, '');
    }
    return input;
  }
  //  [^\+\-\*\/](?<signs>[\+\-\*\/]) - separate by signs
  //   (?<digit>[\d]*)(?<signs>[\+\-\*\/])? - signs with digit but without negative digits
}
