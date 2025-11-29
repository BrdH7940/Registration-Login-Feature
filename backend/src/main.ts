import { NestFactory } from '@nestjs/core'
import { ValidationPipe, BadRequestException, Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { setupSwagger } from './common/config/swagger.config'
import { TrimPipe } from './common/pipes/trim.pipe'

async function bootstrap() {
    const logger = new Logger('Bootstrap')

    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    })

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

    // Global logging interceptor
    app.useGlobalInterceptors(new LoggingInterceptor())

    // Global trim pipe to sanitize input (remove whitespace)
    app.useGlobalPipes(new TrimPipe())

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

    // Setup Swagger documentation (only in non-production)
    if (process.env.NODE_ENV !== 'production') {
        setupSwagger(app)
        logger.log(
            'Swagger documentation available at: http://localhost:3000/api'
        )
    }

    const port = process.env.PORT || 3000
    await app.listen(port, '0.0.0.0')
    logger.log(`Application is running on: http://0.0.0.0:${port}`)
    logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
}
bootstrap()
