import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterDatas } from './dto/get-query-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(query: FilterDatas, user): Promise<Todo[]> {
    if (query.item) {
      const qb = await this.todoRepository
        .createQueryBuilder('todo')
        .select([
          'todo.name',
          'todo.description',
          'todo.status',
          'todo.dateToCreate',
        ])
        .where('user = :user', { user: user })
        .orderBy('dateToCreate', 'DESC')
        .take(query.item);
      return qb.getMany();
    }
    if (query.status) {
      return await this.todoRepository.find({
        select: ['name', 'status', 'description', 'dateToCreate'],
        where: {
          status: query.status,
          user: user,
        },
        order: {
          dateToCreate: 'DESC',
        },
      });
    }
    return await this.todoRepository.find({
      select: ['name', 'status', 'description', 'dateToCreate'],
      order: { dateToCreate: 'DESC' },
      where: {
        user: user,
      },
    });
  }

  async getOneTodo(todoId: string, user): Promise<Todo> {
    return await this.todoRepository.findOne(todoId, {
      select: ['name', 'status', 'description', 'dateToCreate'],
      where: {
        user: user,
      },
    });
  }

  async addTodo(data: AddTodoDto, user): Promise<Todo> {
    const newTodo = await this.todoRepository.create(data);
    newTodo.user = user;
    return await this.todoRepository.save(newTodo);
  }

  async updateTodo(todoId: string, todoUpdated: UpdateTodoDto): Promise<Todo> {
    /***
     * TODO: On récupère la tache à l'id 'todoId, on remplace
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

  /**
   * !compter le nombre de tâche accomplies, et en cours
   * !Même logique pour les tâches en cours
   */
  async countTask(status: FilterDatas, user) {
    const qb = this.todoRepository.createQueryBuilder('countTask');
    qb.select(
      "countTask.status, count(countTask.id) as 'Nombre tâches Terminées'",
    ).where('countTask.status = :status && user= :user', {
      status: status.status,
      user: user,
    });
    return await qb.getRawOne();
  }
}
