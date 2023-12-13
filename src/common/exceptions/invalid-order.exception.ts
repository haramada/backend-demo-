import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOrderException extends HttpException {
  private readonly serviceErrorCode = 100;

  constructor(errorDesc: string) {
    super(errorDesc, HttpStatus.OK);
  }

  public getServiceErrorCode(): number {
    return this.serviceErrorCode;
  }
}
