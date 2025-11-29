import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private connection: Connection) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service health status',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2024-01-01T00:00:00.000Z',
        uptime: 123.456,
        database: {
          status: 'connected',
          readyState: 1,
        },
      },
    },
  })
  async check() {
    const isDbConnected = this.connection.readyState === 1

    return {
      status: isDbConnected ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: isDbConnected ? 'connected' : 'disconnected',
        readyState: this.connection.readyState,
      },
    }
  }
}

