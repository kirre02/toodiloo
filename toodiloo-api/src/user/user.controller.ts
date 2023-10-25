import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { LocalAuthGuard } from '../auth/local.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // An endpoint for creating a user and it will be using the
  // POST method
  @Post('/signup')
  async signUp(@Body() userData: Prisma.UserCreateInput) {
    return this.userService.createUser(userData);
  }

  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
