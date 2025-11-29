export class LoginResponseDto {
  message: string;
  user?: {
    email: string;
    createdAt: Date;
  };
}



