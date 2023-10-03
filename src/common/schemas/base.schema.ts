import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export class BaseSchema {
    @Prop({
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    })
    _id: Schema.Types.ObjectId;
}
