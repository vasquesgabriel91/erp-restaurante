import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './UseCases/CreateUserUseCase';
import { UserRepository } from './repository/UserRepository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase, UserRepository, PrismaService],
})
export class UserModule {}
