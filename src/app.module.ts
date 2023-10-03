import { Module } from '@nestjs/common';
import configuration from './common/config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './modules/project/project.module';
import { VersionModule } from './modules/version/version.module';
import { MulterConfigModule } from './modules/multer/multer.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [configuration],
  }),
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return { uri: configService.get<string>('database.uri') };
    },
  }),
    MulterConfigModule,
    ProjectModule,
    VersionModule,
  ],
})
export class AppModule { }
