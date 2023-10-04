import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constant';
import { AuthType } from '../enums';

export const Auth = (authType: AuthType) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
