import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [UserModule, ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
