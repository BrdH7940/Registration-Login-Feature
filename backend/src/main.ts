import { NestFactory } from '@nestjs/core'
import { ValidationPipe, BadRequestException } from '@nestjs/common'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
  const allowedOrigins = frontendUrl.includes(',')
    ? frontendUrl.split(',').map((url) => url.trim())
    : [frontendUrl, 'http://localhost:5173', 'http://localhost:5174']

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  // Global exception filter for better error handling
  app.useGlobalFilters(new AllExceptionsFilter())

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints || {}).join(', ')
        )
        return new BadRequestException(messages)
      },
    })
  )

  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
