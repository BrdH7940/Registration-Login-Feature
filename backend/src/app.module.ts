import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTIONSTRING ||
        process.env.CONNECTIONSTRING ||
        'mongodb://localhost:27017/ia06'
    ),
    UserModule,
  ],
})
export class AppModule {}
