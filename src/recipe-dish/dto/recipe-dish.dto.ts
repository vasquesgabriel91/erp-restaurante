import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { CreateDishItemDto } from './dish.dto';

export class recipeDishDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome do prato é obrigatório' })
  @IsString()
  nameDish!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descriptionDish!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O Preço do prato é obrigatório ' })
  @IsNumber()
  selling_price_dish!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  available_dish!: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateDishItemDto)
  dishes!: CreateDishItemDto[];
}
