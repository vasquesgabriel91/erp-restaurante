import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseUseCase } from './UseCase/purchase.usecase';

import { PurchaseDto } from './dto/purchase.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseUseCase: PurchaseUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Criar Purchase' })
  @ApiResponse({ status: 200, description: 'Purchase criada com sucesso' })
  async create(@Body() body: PurchaseDto) {
    return this.purchaseUseCase.execute(body);
  }
}
