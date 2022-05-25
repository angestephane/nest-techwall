import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoMiddleware } from './middleware/todo.middleware';
import { logger } from './middleware/logger.middleware';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  controllers: [TodoController],
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    MorganMiddleware.configure('combined');
    consumer
      .apply(TodoMiddleware, logger)
      .forRoutes({ path: 'todo*', method: RequestMethod.DELETE })
      .apply(MorganMiddleware)
      .forRoutes('')
      .apply(HelmetMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.POST });
  }
}
