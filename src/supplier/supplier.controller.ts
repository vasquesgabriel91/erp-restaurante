import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SupplierDto } from './dto/supplier.dto';
import { SupplierUseCase } from './useCases/supplier.use.case';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('supplier')
export class SupplierController {
  constructor(private SupplierUseCase: SupplierUseCase) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @Post()
  async create(@Body() body: SupplierDto) {
    return this.SupplierUseCase.execute(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @Get('getAll')
  async getAll() {
    return this.SupplierUseCase.getAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GERENTE', 'BALCONISTA')
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.SupplierUseCase.findById(id);
  }
}
