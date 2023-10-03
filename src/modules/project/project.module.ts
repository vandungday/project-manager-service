import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/common/schemas';
import { ProjectRepository } from 'src/common/repository/project.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule { }
