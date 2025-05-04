export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  activationToken: string | null;
  activationExpires: Date | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  createdAt: Date;
}

export interface RegisterUserDto {
  email: string;
  password: string;
}
