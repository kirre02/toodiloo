import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [UserModule, AuthModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, TodoService],
})
export class AppModule {}
