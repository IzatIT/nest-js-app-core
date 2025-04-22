import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRATION } from './const';
import { JWT_SECRET_KEY } from 'src/helpers/const';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
