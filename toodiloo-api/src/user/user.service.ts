import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { User, Prisma as db } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../auth/password/password.service';

@Injectable()
export class UserService {
  constructor(
    private db: PrismaService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
  ) {}

  async getUser(uniqeUser: db.UserWhereUniqueInput) {
    return await this.db.user.findUnique({
      where: uniqeUser,
    });
  }

  async createUser(data: db.UserCreateInput) {
    const encrpytPassword = await this.passwordService.hashPassword(
      data.password,
    );

    const { password, ...user } = await this.db.user.create({
      data: {
        ...data,
        password: encrpytPassword,
      },
    });

    return {
      msg: 'Successfully registered',
      username: user.name,
    };
  }

  async updateUser(params: {
    where: db.UserWhereUniqueInput;
    data: db.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.db.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: db.UserWhereUniqueInput): Promise<User> {
    return this.db.user.delete({
      where,
    });
  }
}
