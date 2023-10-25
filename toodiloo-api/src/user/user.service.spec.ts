import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../auth/password/password.service';

const username = 'test';
const usermail = 'test@test.io';
const user1 = 1;
const user2 = 2;

const userArray = [
  { username: 'Erik', email: 'kirre@test.io', id: user1 },
  { username: 'Fabricio', email: 'fabri@test.io', id: user2 },
];

const oneUser = userArray[0];

const db = {
  user: {
    findMany: jest.fn().mockResolvedValue(userArray),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    findFirst: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(oneUser),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneUser),
    delete: jest.fn().mockResolvedValue(oneUser),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PasswordService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create new user', async () => {
    expect(
      service.createUser({
        name: username,
        email: usermail,
        password: 'test123',
      }),
    );
  });

  it('should find one user', async () => {
    expect(
      service.getUser({
        id: user1,
      }),
    );
  });

  it('should delete one user', async () => {
    expect(
      service.deleteUser({
        id: user2,
      }),
    );
  });

  it('should update one user', async () => {
    expect(
      service.updateUser({
        where: {
          id: user1,
        },
        data: {
          password: 'test456',
        },
      }),
    );
  });
});
