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
          message: 'Erreur sur la référence !',
        };
      }
      return getData;
    } catch (e) {
      throw {
        status: e?.status || 500,
        message: e?.status || 500,
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

  updateTodo(id: any, fieldToChange: Todo): Todo {
    const findIndexTodo = this.todo.findIndex((todo) => todo.id === +id);

    if (findIndexTodo === -1) {
      throw {
        status: 400,
        message: 'Cette tâche introuvable',
      };
    }
    const newTodo = {
      ...this.todo[findIndexTodo],
      ...fieldToChange,
      dateToUpdate: new Date().toLocaleDateString('fr-FR', { timeZone: 'UTC' }),
    };
    try {
      this.todo[findIndexTodo] = newTodo;
      return newTodo;
    } catch (e) {
      throw {
        status: e?.status || 500,
        message: e.message || e,
      };
    }
  }

  deleteTodo(id: any): Todo {
    const findDataToDelete = this.todo.findIndex((todo) => todo.id === +id);
    if (findDataToDelete === -1) {
      throw {
        status: 400,
        message: 'donnée introuvable',
      };
    }
    const data = this.todo[findDataToDelete];
    this.todo.splice(findDataToDelete, 1);
    return data;
  }
}
