import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { CreateUserUseCase } from './UseCase/createuser.usecase';
import { Role } from '@prisma/client';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('users')
export class UserController {
  constructor(private createUser: CreateUserUseCase) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE')
  @Post()
  createGerente(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.GERENTE);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE')
  @Post('garcom')
  createGarcom(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.GARCOM);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE')
  @Post('balconista')
  createBalconista(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.BALCONISTA);
  }
}
