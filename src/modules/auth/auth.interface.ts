import { Schema } from 'mongoose';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignTokenPayload {
  userId: Schema.Types.ObjectId;
}
