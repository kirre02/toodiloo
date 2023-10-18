import { Injectable } from '@nestjs/common';
import { User, Prisma as db } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async user(uniqeUser: db.UserWhereUniqueInput): Promise<User | null> {
    return this.db.user.findUnique({
      where: uniqeUser,
    });
  }

  async createUser(data: db.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
    });
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
