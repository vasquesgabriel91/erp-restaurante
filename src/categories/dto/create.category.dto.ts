import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @IsString()
  @ApiProperty()
  name!: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  display_order?: number;

  @ApiProperty()
  @IsBoolean()
  show_in_whatsapp!: boolean;

  @ApiProperty()
  @IsBoolean()
  show_in_app?: boolean;
}
