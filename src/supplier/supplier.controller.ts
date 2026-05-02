import { Body, Controller, Post } from '@nestjs/common';
import { SupplierDto } from './dto/supplier.dto';
import { SupplierUseCase } from './useCases/supplier.use.case';

@Controller('supplier')
export class SupplierController {
  constructor(private SupplierUseCase: SupplierUseCase) {}

  @Post()
  async create(@Body() body: SupplierDto) {
    return this.SupplierUseCase.execute(body);
  }
}
