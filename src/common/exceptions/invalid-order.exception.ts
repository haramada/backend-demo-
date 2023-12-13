import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOrderException extends HttpException {
  constructor(errorDesc: string) {
    super(errorDesc, HttpStatus.OK);
  }
}
