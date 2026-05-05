import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  unit_measurement!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  current_quantity!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  minimum_quantity!: number;
}
