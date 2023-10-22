import { Body, Controller, Post } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  // An endpoint for creating a user and it will be using the
  // POST method
  @Post('/signup')
  async signUp(@Body() userData: Prisma.UserCreateInput ) {
    return this.userService.createUser(userData);
  }
}
