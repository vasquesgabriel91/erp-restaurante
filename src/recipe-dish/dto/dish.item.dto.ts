import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class DishItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unit_measurement!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id_product!: string;

  @IsOptional()
  @ApiProperty()
  @IsUUID()
  id_dish?: string;
}
