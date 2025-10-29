import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import cookieParser from "cookie-parser"
import { NestExpressApplication } from '@nestjs/platform-express';
import mustacheExpress from 'mustache-express';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationFilter } from './validation/validation.filter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService)

  app.use(cookieParser("misteri"));
  app.set('views', __dirname + "/../views");
  app.set("view engine", "html");
  app.engine("html", mustacheExpress());

  app.useGlobalFilters(new ValidationFilter());

  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT") || 3000);


}
bootstrap();
