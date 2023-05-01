import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorsService {
  params: Record<string, any>;

  setParams(params: Record<string, any>): void {
    this.params = params;
  }

  getParams(): Record<string, any> {
    return this.params;
  }
}
