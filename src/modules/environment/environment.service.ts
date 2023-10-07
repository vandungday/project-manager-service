import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnvironmentRepository } from '@/common/repository/environment.repository';
import { buildSearchQuery } from '@/common/helpers/build-search-query';

@Injectable()
export class EnvironmentService {
  constructor(private readonly environmentRepository: EnvironmentRepository) {}

  create(createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentRepository.create(createEnvironmentDto);
  }

  async findAll(search?: any) {
    const {
      query,
      options: { page, limit, skip },
    } = buildSearchQuery(search);
    const projects = await this.environmentRepository.find(query, {
      skip,
      limit,
    });
    const total = projects.length;
    const pages = Math.ceil(total / limit) || 1;

    return { projects, total, page, pages, limit };
  }

  findOne(id: string) {
    const project = this.environmentRepository.findOne({ _id: id });

    if (!project) {
      throw new NotFoundException('Environment not found');
    }

    return project;
  }

  update(id: string, updateEnvironmentDto: UpdateEnvironmentDto) {
    const project = this.environmentRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Environment not found');
    }

    return this.environmentRepository.findOneAndUpdate(
      { _id: id },
      updateEnvironmentDto,
    );
  }

  remove(id: string) {
    const project = this.environmentRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Environment not found');
    }

    return this.environmentRepository.findOneAndDelete({ _id: id });
  }
}
