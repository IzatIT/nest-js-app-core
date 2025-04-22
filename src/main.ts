import { NestFactory } from '@nestjs/core';
import { AppModule, createDefaultUser } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('{"username": "admin", "password": "123456"}')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await createDefaultUser(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
