import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RecipeDishModule } from './recipe-dish/recipe-dish.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    SupplierModule,
    PurchaseModule,
    RecipeDishModule,
  ],
})
export class AppModule {}
