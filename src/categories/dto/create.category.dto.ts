import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @IsString()
  @ApiProperty()
  name!: string;

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
