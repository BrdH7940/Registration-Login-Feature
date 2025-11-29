import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UsePipes,
} from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { RegisterResponseDto } from './dto/register-response.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { LoginResponseDto } from './dto/login-response.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() registerUserDto: RegisterUserDto
    ): Promise<RegisterResponseDto> {
        return this.userService.register(registerUserDto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
        return this.userService.login(loginUserDto)
    }
}
