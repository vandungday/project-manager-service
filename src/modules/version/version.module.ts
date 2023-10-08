import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Version, VersionSchema } from 'src/common/schemas';
import { VersionRepository } from 'src/common/repository/version.repository';
import { GoogleDriveModule } from '../google-drive/google-drive.module';
import { GoogleDriveService } from '../google-drive/google-drive.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Version.name, schema: VersionSchema }]),
    GoogleDriveModule,
  ],
  controllers: [VersionController],
  providers: [VersionService, VersionRepository, GoogleDriveService],
})
export class VersionModule {}
