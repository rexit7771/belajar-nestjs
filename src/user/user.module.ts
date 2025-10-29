import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection, MongoDbConnection, MySqlConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService]
      // ? cara lain
      // useClass:
      //   process.env.DATABASE === "mysql" ? MySqlConnection : MongoDbConnection
    },
    {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: "EmailService",
      useExisting: MailService
    },
    UserRepository,
    MemberService
  ],

  // *Contoh cara sharing provider
  exports: [UserService]
})
export class UserModule { }
