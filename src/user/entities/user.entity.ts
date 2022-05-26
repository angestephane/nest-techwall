import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { types } from 'util';
import { Todo } from '../../todo/entities/todo.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todo: Todo[];
}
