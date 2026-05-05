import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { CreateUserUseCase } from './UseCase/createuser.usecase';
import { Role } from '@prisma/client';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private createUser: CreateUserUseCase) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE')
  @ApiOperation({ summary: 'Criar Gerente' })
  @ApiResponse({ status: 200, description: 'Gerente criado com sucesso' })
  @Post()
  createGerente(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.GERENTE);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE')
  @ApiOperation({ summary: 'Criar Garçom' })
  @ApiResponse({ status: 200, description: 'Garçom criado com sucesso' })
  @Post('garcom')
  createGarcom(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.GARCOM);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE')
  @ApiOperation({ summary: 'Criar Balconista' })
  @ApiResponse({ status: 200, description: 'Balconista criado com sucesso' })
  @Post('balconista')
  createBalconista(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto, Role.BALCONISTA);
  }
}
