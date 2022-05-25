import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterDatas } from './dto/get-pagination-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(query: FilterDatas): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async addTodo(data: AddTodoDto): Promise<Todo> {
    return await this.todoRepository.save(data);
  }

  async updateTodo(todoId: string, todoUpdated: UpdateTodoDto): Promise<Todo> {
    /***
     * TODO: On récupère la tache à l'id 'todoId, on remplace les
     * TODO: les données par ceux de todoUpdated
     * *****/
    const newTodo = await this.todoRepository.preload({
      id: todoId,
      ...todoUpdated,
    });

    //Test si la tâche n'existe pas
    if (!newTodo) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: `Tâche #${todoId} non trouvée`,
      });
    }
    return await this.todoRepository.save(newTodo);
  }

  async deleteTodo(todoId: string): Promise<Todo> {
    const todoToDelete = await this.todoRepository.findOne(todoId);
    if (!todoToDelete) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: `Todo #${todoId} non trouvée`,
      });
    }
    return await this.todoRepository.remove(todoToDelete);
  }

  //Archiver ou desarchiver une tâche
  //!archiver une tâche
  async archiverTodo(todoId: string) {
    return await this.todoRepository.softDelete(todoId);
  }

  //!desarchiver une tâche
  async desarchiverTodo(todoId: string) {
    return await this.todoRepository.restore(todoId);
  }
}
