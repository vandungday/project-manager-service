import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { VersionRepository } from 'src/common/repository/version.repository';
import { buildSearchQuery } from 'src/common/helpers/build-search-query';

@Injectable()
export class VersionService {

  constructor(private readonly versionRepository: VersionRepository) { }

  create(createVersionDto: CreateVersionDto, filePath: string) {
    if (!filePath) {
      throw new NotFoundException('File not found');
    }

    const data = { ...createVersionDto, attachmentFile: filePath }
    return this.versionRepository.create(data);
  }

  async findAll(search?: any) {
    const { query, options: { page, limit, skip } } = buildSearchQuery(search);
    const versions = await this.versionRepository.find(query, { skip, limit });
    const total = versions.length;
    const pages = Math.ceil(total / limit) || 1;

    return { versions, total, page, pages, limit };
  }

  findOne(id: string) {
    const version = this.versionRepository.findById(id);

    if (!version) {
      throw new NotFoundException('Version not found');
    }

    return version;
  }

  update(id: string, updateVersionDto: UpdateVersionDto, filePath: string) {
    const data = { ...updateVersionDto, attachmentFile: filePath }
    const version = this.versionRepository.findById(id);

    if (!version) {
      throw new NotFoundException('Version not found');
    }

    return this.versionRepository.findOneAndUpdate({ _id: id }, data);
  }

  remove(id: string) {
    const version = this.versionRepository.findById(id);

    if (!version) {
      throw new NotFoundException('Version not found');
    }

    return this.versionRepository.findOneAndDelete({ _id: id });
  }
}
