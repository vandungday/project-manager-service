import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guard/jwt.guard';
import { AuthGuard } from './guard/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/common/schemas';
import { UserRepository } from '@/common/repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // JwtGuard,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    UserRepository,
  ],
})
export class AuthModule {}
