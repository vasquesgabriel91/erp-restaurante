import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, SupplierModule],
})
export class AppModule {}
