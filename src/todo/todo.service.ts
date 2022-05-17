import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  sayHello(): string {
    return 'Hello from todo';
  }
}
