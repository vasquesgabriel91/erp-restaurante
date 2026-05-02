import { IsString, IsNotEmpty } from 'class-validator';
import { IsCNPJ } from 'cnpj-universal';

export class SupplierDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @IsCNPJ({ message: 'CNPJ inválido' })
  cnpj!: string;
}
