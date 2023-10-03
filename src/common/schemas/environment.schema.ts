import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base.schema';
import { Stream } from 'stream';

@Schema({
    timestamps: true
})
export class Environment extends BaseSchema {
    @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
    projectId: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String, enum: ['UAT', 'develop', 'staging', 'production'] })
    type: string;

    @Prop({ type: Boolean, default: true })
    isActive: Boolean;
}

export type EnvironmentDocument = HydratedDocument<Environment>;

export const EnvironmentSchema = SchemaFactory.createForClass(Environment);