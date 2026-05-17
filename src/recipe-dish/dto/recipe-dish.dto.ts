import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { DishItemDto } from './dish.item.dto';

export class recipeDishDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome do prato é obrigatório' })
  @IsString()
  name_dish!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A Descrição do prato é obrigatória' })
  @IsString()
  description_dish!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O Preço do prato é obrigatório ' })
  @IsNumber()
  selling_price_dish!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  available_dish!: boolean;

  @ValidateNested({ each: true })
  @Type(() => DishItemDto)
  dishes!: DishItemDto[];
}
