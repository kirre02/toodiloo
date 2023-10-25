import { Module } from '@nestjs/common';
import { PasswordService } from './password/password.service';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [
    PrismaService,
    PasswordService,
    AuthService,
    LocalStrategy,
    UserService,
    SessionSerializer
  ],
  imports: [UserModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
