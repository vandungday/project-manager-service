import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({
    timestamps: true
})
export class Version extends BaseSchema {
    @Prop({ type: Types.ObjectId, ref: 'Environment', required: true })
    enviromentId: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    changeLog: string;

    @Prop({ type: String })
    branchName: string;

    @Prop({ type: String })
    attachmentFile: string;

    @Prop({ type: Date })
    releaseDate: Date

    @Prop({ type: Boolean, default: true })
    isActive: Boolean;
}

export type VersionDocument = HydratedDocument<Version>;

export const VersionSchema = SchemaFactory.createForClass(Version);