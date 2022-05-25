import { IsDate, IsEnum, IsString } from 'class-validator';
import { StatusTask } from '../entities/todo.entity';

export class SelectData {
  @IsString()
  name: string;

  @IsEnum(StatusTask)
  status: string;

  @IsString()
  description: Date;

  @IsDate()
  dateToCreate: Date;

  @IsDate()
  dateToUpdate: Date;
}
