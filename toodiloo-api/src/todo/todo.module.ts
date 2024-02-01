import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [TodoService, PrismaService],
    controllers: [TodoController],
})
export class TodoModule {}

