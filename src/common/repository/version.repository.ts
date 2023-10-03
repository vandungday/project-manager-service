import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Version } from '../schemas';

@Injectable()
export class VersionRepository extends BaseRepository<Version> {
    constructor(@InjectModel(Version.name) private versionModel: Model<Version>) {
        super(versionModel);
    }
}
