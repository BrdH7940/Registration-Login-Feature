import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response, Request } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

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

    // Log error details
    const errorLog = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      ...(exception instanceof Error && exception.stack && { stack: exception.stack }),
    }

    if (status >= 500) {
      this.logger.error(`${request.method} ${request.url}`, exception instanceof Error ? exception.stack : JSON.stringify(errorLog))
    } else {
      this.logger.warn(`${request.method} ${request.url} - ${message}`)
    }

    // Return format that frontend expects: { message: string }
    response.status(status).json({
      message: typeof message === 'string' ? message : JSON.stringify(message),
    })
  }
}
