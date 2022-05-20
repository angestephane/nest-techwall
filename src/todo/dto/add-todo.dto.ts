import { IsNotEmpty, IsString } from 'class-validator';

export class AddTodoDto {
  @IsString({
    message: 'Vous dévez saisir une chaine de caractère',
  })
  @IsNotEmpty({
    message: 'Ce champs est obligatoire',
  })
  name: string;

  @IsString({
    message: 'La tâche doit avoir une description',
  })
  @IsNotEmpty({
    message: 'Ce champs est obligatoire',
  })
  description: string;
}
