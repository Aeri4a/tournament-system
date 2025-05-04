import { User } from 'common';

export interface AuthRequest extends Request {
  user: Omit<User, 'passwordHash'>;
}
