import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvalidOrderException } from '../exceptions/invalid-order.exception';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    let status = exception.getStatus();
    const errorDesc = exception.message;

    //we define the shape of custom message we want the client to see and parse
    let serviceErrorCode = 0;
    if (exception instanceof InvalidOrderException) {
      serviceErrorCode = exception.getServiceErrorCode();
      status = HttpStatus.NOT_ACCEPTABLE;
    }

    const errorResponse = {
      status,
      errorDesc,
      serviceErrorCode,
      path: req.url,
    };

    res.status(status).json(errorResponse);
  }
}
