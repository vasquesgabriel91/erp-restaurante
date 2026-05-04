import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PurchaseItemDto {
  @IsString({ message: 'O campo id do produto é obrigatório' })
  id_product!: string;

  @IsNotEmpty({ message: 'O campo preço unitário é obrigatório' })
  @IsNumber()
  unit_price!: number;

  @IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
  @IsNumber()
  quantity!: number;

  @IsNotEmpty({ message: 'O campo unidade de medida é obrigatório' })
  @IsString()
  unit_measurement!: string;
}

export class PurchaseDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items!: PurchaseItemDto[];

  @IsString({ message: 'O campo data é obrigatório' })
  date!: string;
}
