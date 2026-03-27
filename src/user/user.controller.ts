import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { CreateUserUseCase } from './UseCases/CreateUserUseCase';
import { Role } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  createGerente(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.GERENTE);
  }

  @Post('garcom')
  createGarcom(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.GARCOM);
  }

  @Post('balconista')
  createBalconista(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.BALCONISTA);
  }
}
