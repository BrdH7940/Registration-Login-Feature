import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { RegisterResponseDto } from './dto/register-response.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { RateLimitGuard } from '../common/guards/rate-limit.guard'

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(new RateLimitGuard(5, 60000)) // 5 requests per minute
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterUserDto })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: RegisterResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed or invalid input',
    })
    @ApiResponse({
        status: 409,
        description: 'Email already registered',
    })
    @ApiResponse({
        status: 429,
        description: 'Too many requests',
    })
    async register(
        @Body() registerUserDto: RegisterUserDto
    ): Promise<RegisterResponseDto> {
        return this.userService.register(registerUserDto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(new RateLimitGuard(10, 60000)) // 10 requests per minute (more lenient for login)
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: LoginUserDto })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: LoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid email or password',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed or invalid input',
    })
    @ApiResponse({
        status: 429,
        description: 'Too many requests',
    })
    async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
        return this.userService.login(loginUserDto)
    }
}
