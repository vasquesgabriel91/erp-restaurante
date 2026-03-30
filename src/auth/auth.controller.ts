import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from './useCases/LoginUseCase';
import { CreateUserDto } from '../user/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post('login')
  login(@Body() body: CreateUserDto) {
    return this.loginUseCase.signIn(body.userName, body.passWord);
  }
}
