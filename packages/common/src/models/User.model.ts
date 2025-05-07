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

export type UserLoginDto = Pick<User, 'email'> & { password: string };

export type RegisterUserDto = UserLoginDto &
  Pick<User, 'firstName' | 'lastName'>;
