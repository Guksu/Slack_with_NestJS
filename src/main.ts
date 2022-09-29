import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // 에러 발생시 프론트에 메세지를 보내주는 미들웨어
  app.useGlobalFilters(new HttpExceptionFilter());
  //class-validator사용
  app.useGlobalPipes(new ValidationPipe());

  // swagger사용법을 찾아볼것
  const config = new DocumentBuilder()
    .setTitle('Slack Api')
    .setDescription('슬랙 API')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`process starting on port ${port}`);

  //-------------------- Nodemon 처럼 설정해주는 코드------------------//
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  //----------------------------------------------------------------//
}
bootstrap();
