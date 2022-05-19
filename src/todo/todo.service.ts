import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodo } from './dto/add-todo.dto';
import { v4 as uuid } from 'uuid';

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

  addTodo(data: AddTodo): void {
    if (!data.name || !data.description) {
      throw {
        status: 400,
        message: 'Donnée manquante !',
      };
    }

    const newTodo = {
      name: data.name,
      description: data.description,
    };

    const todoToAdd: Todo = {
      ...newTodo,
      dateToCreate: new Date().toLocaleDateString('fr-FR', { timeZone: 'UTC' }),
      dateToUpdate: new Date().toLocaleDateString('fr-FR', { timeZone: 'UTC' }),
      id: uuid(),
    };
    const testIfDataExiste = this.todo.find(
      (todo) => todo.name === todoToAdd.name,
    );
    if (testIfDataExiste) {
      throw {
        status: 400,
        message: 'La tâche existe !',
      };
    }
    this.todo.push(todoToAdd);
  }

  updateTodo(id: string, fieldToChange: AddTodo): Todo {
    const findIndexTodo = this.todo.findIndex((todo) => todo.id === id);
    console.log(findIndexTodo);
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
    this.todo[findIndexTodo] = newTodo;
    return newTodo;
  }

  deleteTodo(id: any): Todo {
    const findDataToDelete = this.todo.findIndex((todo) => todo.id === +id);
    if (findDataToDelete === -1) {
      throw new NotFoundException({
        status: 400,
        message: 'donnée introuvable',
      });
    } else {
      const data = this.todo[findDataToDelete];
      this.todo.splice(findDataToDelete, 1);
      return data;
    }
  }
}
