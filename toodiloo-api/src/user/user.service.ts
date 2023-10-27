import { Injectable, forwardRef, Inject} from '@nestjs/common';
import  {User, Prisma as db} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../auth/password/password.service';
import errorHandler from '../util/errorHandler';

@Injectable()
export class UserService {
  constructor(
    private db: PrismaService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
  ) {}

  async getUser(uniqeUser: db.UserWhereUniqueInput): Promise<User> {
    return await this.db.user.findUnique({
      where: uniqeUser,
    });
  }

  async createUser(data: db.UserCreateInput) {
    try {
      const encrpytPassword = await this.passwordService.hashPassword(data.password);

      const user = await this.db.user.create({
        data: {
          ...data,
          password: encrpytPassword,
        },
      });
      
      return {
        msg: "Successfully created user",
        username: user.name,
      };
    } catch(e) {
      errorHandler(e);
    }

  }

  async updateUser(params: {
    where: db.UserWhereUniqueInput;
    data: db.UserUpdateInput;
  }) {
    try {
    const { where, data } = params;
    const user = await this.db.user.update({
      data,
      where,
    });

    return {
      msg:"Successfully updated user",
      username: user.name
    }
  } catch(e) {
    errorHandler(e);
  }
  }

  async deleteUser(where: db.UserWhereUniqueInput) {
    try {
    const user = await this.db.user.delete({
      where,
    });

    return {
      msg: `${user.name} has been deleted`,
    }
  } catch(e) {
    errorHandler(e);
  }
  }
}
