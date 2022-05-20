import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString({
    message: 'Vous dévez saisir une chaine de caractère',
  })
  @IsNotEmpty({
    message: 'Ce champs est obligatoire',
  })
  name: string;

  @IsString({
    message: 'Vous dévez saisir une chaine de caractère',
  })
  @IsNotEmpty({
    message: 'Ce champs est obligatoire',
  })
  description: string;

  @IsIn(['En cours', 'Terminée'], {
    message: 'le status doit être soit "En cours" ou "Terminée" ',
  })
  status: string;
}
