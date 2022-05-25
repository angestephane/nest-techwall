import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntitie {
  @CreateDateColumn({
    update: false,
  })
  dateToCreate: Date;

  @UpdateDateColumn()
  dateToUpdate: Date;

  @DeleteDateColumn()
  dateToDelete: Date;
}
