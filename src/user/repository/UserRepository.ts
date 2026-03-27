import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  createUser(data: { userName: string; passWord: string; role: Role }) {
    try {
      return this.prisma.user.create({ data });
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erro ao criar usuário no repositório',
        error: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  findByUserName(userName: string) {
    try {
      return this.prisma.user.findUnique({
        where: { userName },
      });
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erro ao buscar usuário no repositório',
        error: error instanceof Error ? error.message : 'unknown',
      });
    }
  }
}
