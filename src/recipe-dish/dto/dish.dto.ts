import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDishItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
