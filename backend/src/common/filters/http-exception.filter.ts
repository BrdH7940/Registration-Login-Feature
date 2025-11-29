import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'An error occurred'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else {
        const responseObj = exceptionResponse as any
        // Handle array of messages or single message
        if (Array.isArray(responseObj.message)) {
          // Join multiple validation errors into a single message
          message = responseObj.message.join(', ') || 'Validation failed'
        } else {
          message = responseObj.message || exception.message
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    // Return format that frontend expects: { message: string }
    response.status(status).json({
      message: typeof message === 'string' ? message : JSON.stringify(message),
    })
  }
}
