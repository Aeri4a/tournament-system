import { User } from 'common';

export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
  };
}
