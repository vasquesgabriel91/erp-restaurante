import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsCNPJ } from 'cnpj-universal';

export class SupplierDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsCNPJ({ message: 'CNPJ inválido' })
  cnpj!: string;
}
