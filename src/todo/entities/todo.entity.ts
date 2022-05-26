import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntitie } from '../generics/timestamp.entities';

export enum StatusTask {
  EN_COURS = 'En cours',
  TERMINEE= 'Terminée',
}

@Entity('todo')
export class Todo extends TimestampEntitie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  name: string;

  @Column('varchar', {length: 50})
  description: string;

  @Column({
    type: 'enum',
    enum: StatusTask,
    default: StatusTask.EN_COURS
  })
  status: string;

  @ManyToOne(type => User, (user) => user.todo)
  user: User;

}
