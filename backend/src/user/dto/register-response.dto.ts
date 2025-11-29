import { ApiProperty } from '@nestjs/swagger'

export class RegisterResponseDto {
  @ApiProperty({
    example: 'User registered successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: {
      email: 'user@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    description: 'Registered user information',
    required: false,
  })
  user?: {
    email: string;
    createdAt: Date;
  };
}

