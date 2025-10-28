import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser"
import { NestExpressApplication } from '@nestjs/platform-express';
import mustacheExpress from 'mustache-express';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser("misteri"));
  app.set('views', __dirname + "/../views");
  app.set("view engine", "html");
  app.engine("html", mustacheExpress());

  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT") || 3000);
}
bootstrap();
