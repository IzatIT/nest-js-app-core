import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './authentifcation/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './authentifcation/entities/user.entity';
import { JwtStrategy } from './security/jwt.strategy';
import { Diagram, DiagramCard, DiagramField, DiagramFieldValue, DiagramSpecification } from './diagram/entities';
import { Reference } from './reference/entities/reference.entity';
import { DiagramModule } from './diagram/diagram.module';
import { ReferenceModule } from './reference/reference.module';
import { DiagramSpecificationModule } from './diagram-specification/diagram-specification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [
        User,
        Diagram,
        DiagramField,
        DiagramSpecification,
        DiagramCard,
        DiagramFieldValue,
        Reference,
      ],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UserModule,
    DiagramModule,
    ReferenceModule,
    DiagramSpecificationModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }



import { INestApplication } from '@nestjs/common';
import { UserService } from './authentifcation/user.service';
import { SignUpRequest } from './authentifcation/dto/signup.dto';

export async function createDefaultUser(app: INestApplication) {
  const userService = app.get(UserService);

  const existing = await userService.getByUsername('admin');
  if (!existing) {
    const defaultUser: SignUpRequest = {
      username: 'admin',
      password: '123456',
      firstName: 'Админ',
      lastName: 'Система',
      role: 'admin',
    };

    await userService.signUp(defaultUser);
    console.log('✅ Default admin user created');
  } else {
    console.log('ℹ️ Default admin user already exists');
  }
}
