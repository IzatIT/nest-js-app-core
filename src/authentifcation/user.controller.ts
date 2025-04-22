import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignInRequest, SignInResponse } from './dto/signin.dto';
import { SignUpRequest, SignUpResponse } from './dto/signup.dto';
import {
  ChangePasswordRequest,
  UsersResponse,
} from './dto/user.dto';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';

@ApiTags('Users')
@Controller('Users')
export class UserController {
  constructor(private readonly authService: UserService) { }

  @Post('SignUp')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: SignUpRequest })
  @ApiResponse({ status: 200, description: 'Регистрация нового пользователя', type: SignUpRequest })
  async register(@Body() req: SignUpRequest): Promise<SignUpResponse> {
    return await this.authService.signUp(req);
  }

  @Post('SignIn')
  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: SignInRequest })
  @ApiResponse({ status: 200, description: 'Авторизация', type: SignInResponse })
  async login(@Body() req: SignInRequest): Promise<SignInResponse | Error> {
    return await this.authService.signIn(req);
  }

  @Post('RefreshToken')
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiBody({ schema: { example: { refreshToken: 'your-refresh-token' } } })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refreshTokens(refreshToken);
  }

  @Get('GetAll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Список пользователей', type: [UsersResponse] })
  async getAllUsers(): Promise<UsersResponse[]> {
    return this.authService.getAllUsers();
  }

  @Get('GetMe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Получить текущего пользователя', type: UsersResponse })
  async getMe(@Req() request: Request) {
    const userId = (request as any).user.userId;
    return this.authService.getUserById(userId);
  }

  @Post('ChangePassword')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Сменить пароль' })
  @ApiBody({ type: ChangePasswordRequest })
  async changePassword(
    @Body() req: ChangePasswordRequest,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    const userId = (request as any).user.userId as string;
    return await this.authService.changePassword(
      req.oldPassword,
      req.newPassword,
      userId,
      req.userId,
    );
  }
}
