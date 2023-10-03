import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({
    timestamps: true
})
export class Project extends BaseSchema {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Boolean, default: true })
    isActive: Boolean;

    @Prop({ type: Date })
    timeEnd: Date;
}

export type ProjectDocument = HydratedDocument<Project>;

export const ProjectSchema = SchemaFactory.createForClass(Project);