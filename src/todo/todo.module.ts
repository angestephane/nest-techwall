import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoMiddleware } from './middleware/todo.middleware';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TodoMiddleware).forRoutes('todo');
  }
}
