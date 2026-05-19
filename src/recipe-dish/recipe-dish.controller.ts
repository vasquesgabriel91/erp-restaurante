import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { recipeDishDto } from './dto/recipe-dish.dto';
import { RecipeDishUseCase } from './useCase/recipe-dish.usecase';

@ApiTags('Dish')
@Controller('recipe-dish')
export class RecipeDishController {
  constructor(private RecipeDishUseCase: RecipeDishUseCase) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar prato' })
  @ApiResponse({ status: 200, description: 'Prato criado com sucesso' })
  @Post()
  async create(@Body() body: recipeDishDto) {
    return this.RecipeDishUseCase.create(body);
  }

  @Get()
  async getAll() {
    return this.RecipeDishUseCase.getAll();
  }
}
