import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { Unit } from '../domain/converter.unit.measurement';

export class PurchaseItemDto {
  @IsNotEmpty({ message: 'O campo produto é obrigatório' })
  @IsString()
  id_product!: string;

  @IsNotEmpty({ message: 'O campo preço unitário é obrigatório' })
  @IsNumber()
  unit_price!: number;

  @IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
  @IsNumber()
  quantity!: number;

  @IsNotEmpty({ message: 'O campo unidade de medida é obrigatório' })
  @IsString()
  unit_measurement!: Unit;
}

export class PurchaseDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items!: PurchaseItemDto[];

  @IsNotEmpty({ message: 'O campo data é obrigatório' })
  @IsString()
  date!: string;

  @IsNotEmpty({ message: 'O campo fornecedor é obrigatório' })
  @IsString()
  id_supplier!: string;
}
