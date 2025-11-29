import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<RegisterResponseDto> {
    const { email, password } = registerUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`Registration attempt with existing email: ${email}`);
      throw new ConflictException('Email already registered');
    }

    try {
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const user = new this.userModel({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      const savedUser = await user.save();
      this.logger.log(`User registered successfully: ${email}`);

      return {
        message: 'User registered successfully',
        user: {
          email: savedUser.email,
          createdAt: savedUser.createdAt,
        },
      };
    } catch (error) {
      // Handle duplicate key error (email unique constraint)
      if (error.code === 11000) {
        this.logger.warn(`Duplicate key error during registration: ${email}`);
        throw new ConflictException('Email already registered');
      }
      this.logger.error(`Error registering user: ${email}`, error.stack);
      throw new InternalServerErrorException(
        'An error occurred while registering the user'
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.warn(`Login attempt with non-existent email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login attempt with invalid password for: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`User logged in successfully: ${email}`);
    return {
      message: 'Login successful',
      user: {
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}

