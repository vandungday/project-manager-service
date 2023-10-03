import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Version, VersionSchema } from 'src/common/schemas';
import { VersionRepository } from 'src/common/repository/version.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Version.name, schema: VersionSchema }])],
  controllers: [VersionController],
  providers: [VersionService, VersionRepository],
})
export class VersionModule { }
