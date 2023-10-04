import { Module } from '@nestjs/common';
import configuration from './common/config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './modules/project/project.module';
import { VersionModule } from './modules/version/version.module';
import { MulterConfigModule } from './modules/multer/multer.module';
import { EnvironmentModule } from './modules/environment/environment.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [ConfigModule.forRoot({
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
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      url: configService.get<string>('database.postgres_uri'),
      entities: [User],
      synchronize: true,
    }),
  }),
    MulterConfigModule,
    ProjectModule,
    VersionModule,
    EnvironmentModule,
    AuthModule,
  ],
})
export class AppModule { }
