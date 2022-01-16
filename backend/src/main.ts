import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: true
  });
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Statify API')
    .setDescription('API to control Statify')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

console.log(process.env.secret)

if (process.env.secret === 'Bad Secret') {
  console.error("Create a secret in your .env file! (Key is 'secret')");
} else {
  bootstrap();
}
