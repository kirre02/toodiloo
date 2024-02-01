import { TodoService } from './todo.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';

const todo1 = 1;
const todo2 = 2;

const todoArray = [
  { todoname: 'idek', description: '', id: todo1 },
  { todoname: 'testing', description: 'write tests', id: todo2 },
];

const onetodo = todoArray[0];

const db = {
  todo: {
    findMany: jest.fn().mockResolvedValue(todoArray),
    findUnique: jest.fn().mockResolvedValue(onetodo),
    findFirst: jest.fn().mockResolvedValue(onetodo),
    create: jest.fn().mockReturnValue(onetodo),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(onetodo),
    delete: jest.fn().mockResolvedValue(onetodo),
  },
};

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService, 
        {
          provide: PrismaService, 
          useValue: db
        }],
    }).compile();

    service = module.get(TodoService);
  });

  it('should create new Todo, without a description', async () => {
    expect(
      service.create({
        title: "testify"
      }),
    );
  });

  it('should find one Todo', async () => {
    expect(
      service.get({
        id: todo1,
      }),
    );
  });

  it('should delete one Todo', async () => {
    expect(
      service.delete({
        id: todo2,
      }),
    );
  });

  it('should update one Todo', async () => {
    expect(
      service.update({
        where: {
          id: todo1,
        },
        data: {
          title: "change title"
        },
      }),
    );
  });
});
