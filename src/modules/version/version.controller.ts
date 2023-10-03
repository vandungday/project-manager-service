import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VERSION_FILE_NAME, VERSION_FILE_PATH, VERSION_FILE_SIZE, VERSION_FILE_TYPE } from '@/common/constants/verson.constant';
import { setUploadOptions } from '@/common/config/multer.config';
import { ApiOkResponse, ApiTags, } from '@nestjs/swagger';
import { GetVersions } from './swagger';

@Controller('api/v1/versions')
@ApiTags('versions')
export class VersionController {
  constructor(private readonly versionService: VersionService) { }

  @ApiOkResponse({
    description: 'OK - create new version success',
    type: CreateVersionDto,
  })
  @Post()
  @UseInterceptors(
    FileInterceptor(
      VERSION_FILE_NAME,
      setUploadOptions(
        VERSION_FILE_PATH,
        VERSION_FILE_TYPE,
        VERSION_FILE_SIZE,
      ),
    ),
  )
  create(@Body() createProjectDto: CreateVersionDto, @UploadedFile() file: Express.Multer.File) {
    return this.versionService.create(createProjectDto, file.path);
  }

  @ApiOkResponse({
    description: 'OK - get all versions success',
    type: GetVersions,
  })
  @Get()
  findAll(@Query() search?: any) {
    return this.versionService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      VERSION_FILE_NAME,
      setUploadOptions(
        VERSION_FILE_PATH,
        VERSION_FILE_TYPE,
        VERSION_FILE_SIZE,
      ),
    ),
  )
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateVersionDto, @UploadedFile() file: Express.Multer.File) {
    return this.versionService.update(id, updateProjectDto, file.path);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionService.remove(id);
  }
}
