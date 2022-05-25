import {
  Column,
  Entity,
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


}
