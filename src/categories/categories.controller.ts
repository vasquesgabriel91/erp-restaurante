import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CategoriesUseCase } from './useCase/categories.use.cases';
import { CreateCategoryDto } from './dto/create.category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesUseCase: CategoriesUseCase) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Criar Category' })
  @ApiResponse({ status: 200, description: 'Categoria criada com sucesso' })
  async create(@Body() body: CreateCategoryDto) {
    return this.CategoriesUseCase.execute(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @ApiBearerAuth()
  @Get()
  async getAllWithWhatsAppTrue() {
    return this.CategoriesUseCase.getAllWithWhatsAppTrue();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar todas as categorias' })
  @ApiResponse({ status: 200, description: 'Categorias deletadas com sucesso' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.CategoriesUseCase.deleteCategory(id);
  }
}
