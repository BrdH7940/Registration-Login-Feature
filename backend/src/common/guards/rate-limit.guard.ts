import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * Simple in-memory rate limiting guard
 * For production, consider using @nestjs/throttler or Redis-based solution
 */
@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, number[]>()
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests = 5, windowMs = 60000) {
    // Default: 5 requests per minute
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const ip = this.getClientIp(request)
    const now = Date.now()

    // Clean old entries
    this.cleanOldEntries(ip, now)

    // Get requests for this IP
    const ipRequests = this.requests.get(ip) || []

    // Check if limit exceeded
    if (ipRequests.length >= this.maxRequests) {
      throw new HttpException(
        {
          message: 'Too many requests. Please try again later.',
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    // Add current request
    ipRequests.push(now)
    this.requests.set(ip, ipRequests)

    return true
  }

  private getClientIp(request: any): string {
    return (
      request.ip ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      'unknown'
    )
  }

  private cleanOldEntries(ip: string, now: number): void {
    const ipRequests = this.requests.get(ip)
    if (!ipRequests) return

    const validRequests = ipRequests.filter(
      (timestamp) => now - timestamp < this.windowMs,
    )
    this.requests.set(ip, validRequests)
  }
}




