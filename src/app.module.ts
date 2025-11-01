import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { ValidationModule } from './validation/validation.module';
import winston from "winston";
import { LogMiddleware } from './log/log.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => new Date().toLocaleString("id-ID", { hour12: false })
        }),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
      level: "debug",
      transports: [new winston.transports.Console()],
    }),

    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    PrismaModule,
    ValidationModule.forRoot(true),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: "/user/*path",
      method: RequestMethod.ALL
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: "/user/current",
      method: RequestMethod.GET
    });
  }
}
