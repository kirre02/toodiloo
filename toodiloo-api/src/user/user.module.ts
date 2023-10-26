import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../auth/password/password.service';

@Module({
  providers: [UserService, PrismaService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
