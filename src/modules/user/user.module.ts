import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDB } from './user.db';

@Module({
  providers: [UserService, UserDB],
  controllers: [UserController],
})
export class UserModule {}
