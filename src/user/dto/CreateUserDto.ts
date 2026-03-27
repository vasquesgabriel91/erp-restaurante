import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Matches(/(?=.*[a-z])/, { message: 'Deve ter letra minúscula' })
  @Matches(/(?=.*[A-Z])/, { message: 'Deve ter letra maiúscula' })
  @Matches(/(?=.*\d)/, { message: 'Deve ter número' })
  @Matches(/(?=.*[@$!%*?&])/, { message: 'Deve ter caractere especial' })
  passWord: string;
}
