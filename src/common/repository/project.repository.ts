import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Project } from '../schemas';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {
        super(projectModel);
    }
}
