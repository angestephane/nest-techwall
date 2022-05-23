import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class FilterDatas {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  item: number;

  @IsString()
  @IsOptional()
  status: string;
}
