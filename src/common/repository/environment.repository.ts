import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Environment } from '../schemas';

@Injectable()
export class EnvironmentRepository extends BaseRepository<Environment> {
    constructor(@InjectModel(Environment.name) private environmentModel: Model<Environment>) {
        super(environmentModel);
    }
}
