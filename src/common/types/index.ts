import { User } from '../schemas';

export type UserWithoutPassword = Omit<User, 'password'>;
