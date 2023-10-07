import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base.schema';
import { RoleType } from '../enums';

@Schema({
  timestamps: true,
})
export class User extends BaseSchema {
  @Prop({ type: String, required: true, unique: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  password: string;

  @Prop({
    type: String,
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Prop({ type: Boolean, default: true })
  isActive: Boolean;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
