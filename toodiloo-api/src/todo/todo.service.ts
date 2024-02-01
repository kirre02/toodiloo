import errorHandler from '../util/errorHandler';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma as db } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  constructor(
    private db: PrismaService,
  ) { }

  async get(uniqeTodo: db.TodoWhereUniqueInput): Promise<Todo> {
    return await this.db.todo.findUnique({
      where: uniqeTodo,
    });
  }

  async create(data: db.TodoCreateInput) {
    try {
      const todo = await this.db.todo.create({
        data: data
      })
      return {
        msg: "Successfully created todo",
        todo: todo.title
      }
    } catch (e) {
      errorHandler(e);
    }
  }

  // async update(params : {where: db.TodoWhereUniqueInput, data: db.TodoUpdateInput}) {
  //   try {
  //     const {where, data} = params
  //     const todo = await this.db.todo.update({
  //       where: {
  //         id: where.id
  //       },
  //       data: data
  //     })

  //     return {
  //       msg:"Successfully updated todo",
  //       todo: todo.title
  //     }
  //   } catch(e) {
  //     errorHandler(e)
  //   }
  // }

  async update(params: {
    where: db.TodoWhereUniqueInput;
    data: db.TodoUpdateInput;
  }) {
    try {
      const { where, data } = params;
      const todo = await this.db.todo.update({
        data,
        where,
      });

      return {
        msg: "Successfully updated user",
        title: todo.title
      }
    } catch (e) {
      errorHandler(e);
    }
  }

  async delete(where: db.TodoWhereUniqueInput) {
    try {
      const todo = await this.db.todo.delete({
        where,
      })

      return {
        msg: "todo was deleted",
        todo: todo.title
      }
    } catch (e) {
      errorHandler(e)
    }
  }
}
