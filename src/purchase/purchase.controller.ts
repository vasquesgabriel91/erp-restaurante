import { Body, Controller, Get, Post } from '@nestjs/common';
import { PurchaseUseCase } from './UseCase/purchase.usecase';

import { PurchaseDto } from './dto/purchase.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseUseCase: PurchaseUseCase) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar Purchase' })
  @ApiResponse({ status: 200, description: 'Purchase criada com sucesso' })
  async create(@Body() body: PurchaseDto) {
    return this.purchaseUseCase.execute(body);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas as Purchases' })
  @ApiResponse({ status: 200, description: 'Lista de Purchases' })
  async getAll() {
    return this.purchaseUseCase.getAllPurchases();
  }
}
