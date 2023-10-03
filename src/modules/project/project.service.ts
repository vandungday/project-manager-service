import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from 'src/common/repository/project.repository';
import { buildSearchQuery } from 'src/common/helpers/build-search-query';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) { }

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.create(createProjectDto);
  }

  async findAll(search?: any) {
    const { query, options: { page, limit, skip } } = buildSearchQuery(search);
    const projects = await this.projectRepository.find(query, { skip, limit });
    const total = projects.length;
    const pages = Math.ceil(total / limit) || 1;

    return { projects, total, page, pages, limit };
  }

  findOne(id: string) {
    const project = this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.projectRepository.findOneAndUpdate({ _id: id }, updateProjectDto);
  }

  remove(id: string) {
    const project = this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.projectRepository.findOneAndDelete({ _id: id });
  }
}
