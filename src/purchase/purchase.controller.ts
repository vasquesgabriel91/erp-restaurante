import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseUseCase } from './UseCase/purchase.usecase';

import { PurchaseDto } from './dto/purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseUseCase: PurchaseUseCase) {}

  @Post()
  async create(@Body() body: PurchaseDto) {
    return this.purchaseUseCase.execute(body);
  }
}
