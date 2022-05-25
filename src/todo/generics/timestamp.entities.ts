import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntitie {
  @CreateDateColumn({
    update: false,
  })
  dateToCreate: string;

  @UpdateDateColumn()
  dateToUpdate: string;

  @DeleteDateColumn()
  dateToDelete: string;
}
