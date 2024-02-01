import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Post('/add')
  create(@Body() todoData: Prisma.TodoCreateInput) {
    return this.TodoService.create(todoData)
  }

  @Get('/get/:id')
  get(@Param('id') id: string) {
    const where = {id: parseInt(id, 10)}
    return this.TodoService.get(where)
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    const where = {id: parseInt(id, 10)}
    return this.TodoService.delete(where)
  }
  
  @Put('/update/:id')
  update(@Body() todo: Prisma.TodoUpdateInput, @Param('id') id: string) {
    const where = {id: parseInt(id, 10)}
    const data = todo
    return this.TodoService.update({where, data})
  }
}
