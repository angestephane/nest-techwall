import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  getAllTodos(): string {
    return 'Hello from todo';
  }

  getTodo(id: string): string {
    return `Hello ${id}`;
  }

  addTodo(data: any): void {
    console.log(data);
  }

  updateTodo(id: string): string {
    return `this methode update this ${id} todo`;
  }

  deleteTodo(id: string): string{
    return `delete this ${id}`;
  }
}
