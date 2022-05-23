import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString({
    message: 'Vous dévez saisir une chaine de caractère',
  })
  @IsOptional()
  name: string;

  @IsString({
    message: 'Vous dévez saisir une chaine de caractère',
  })
  @IsOptional()
  description: string;

  @IsIn(['En cours', 'Terminée'], {
    message: 'le status doit être soit "En cours" ou "Terminée" ',
  })
  @IsOptional()
  status: string;
}
