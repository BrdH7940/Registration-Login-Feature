import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { HealthController } from './common/health/health.controller'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            ignoreEnvFile: false, // Try to load .env file if it exists
            // Will fallback to process.env if .env doesn't exist (like on Render)
        }),
        MongooseModule.forRoot(
            process.env.MONGODB_CONNECTIONSTRING ||
                'mongodb://localhost:27017/ia06'
        ),
        UserModule,
    ],
    controllers: [HealthController],
})
export class AppModule {}
