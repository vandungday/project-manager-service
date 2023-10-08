import { Module } from '@nestjs/common';
import configuration from './common/config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './modules/project/project.module';
import { VersionModule } from './modules/version/version.module';
import { MulterConfigModule } from './modules/multer/multer.module';
import { EnvironmentModule } from './modules/environment/environment.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GoogleDriveModule } from './modules/google-drive/google-drive.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { uri: configService.get<string>('database.mongo_uri') };
      },
    }),
    MulterConfigModule,
    ProjectModule,
    VersionModule,
    EnvironmentModule,
    UserModule,
    AuthModule,
    GoogleDriveModule,
  ],
})
export class AppModule {}
