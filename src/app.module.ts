import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './authentifcation/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './authentifcation/entities/user.entity';
import { JwtStrategy } from './security/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
