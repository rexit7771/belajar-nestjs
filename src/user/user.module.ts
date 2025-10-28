import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection, MongoDbConnection, MySqlConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
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
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]
    },
    MemberService
  ],

  // *Contoh cara sharing provider
  exports: [UserService]
})
export class UserModule { }
