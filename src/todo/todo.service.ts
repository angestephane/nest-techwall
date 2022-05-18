import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todo: Array<Todo> = [];

  getAllTodos(): Array<Todo> {
    return this.todo;
  }

  getTodo(id: any): Todo {
    try {
      const getData = this.todo.find((todo) => todo.id === +id);

      if (!getData) {
        throw {
          status: 400,
          message: 'La donnée est inexistant',
        };
      }
      return getData;
    } catch (e) {
      throw {
        status: e.status || e,
        message: e.message || e,
      };
    }
  }

  addTodo(data: Todo): void {
    if (this.todo.length) {
      data.id = this.todo[this.todo.length - 1].id + 1;
    } else {
      data.id = 1;
    }

    if (!data.name) {
      throw {
        status: 400,
        message: 'vous devez définir le nom de la tâche',
      };
    } else {
      this.todo.map((todo) => {
        if (todo.name === data.name) {
          throw {
            status: 400,
            message: 'Cette tâche existe !',
          };
        }
      });
    }
    this.todo.push(data);
  }

  updateTodo(id: string): string {
    return `this methode update this ${id} todo`;
  }

  deleteTodo(id: string): string {
    return `delete this ${id}`;
  }
}
