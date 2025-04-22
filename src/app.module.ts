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
