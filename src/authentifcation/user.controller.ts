import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInRequest, SignInResponse } from './interfaces/signin.interface';
import { SignUpRequest, SignUpResponse } from './interfaces/signup.interface';
import { ChangePasswordRequest, UsersGetAllResponse } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';

@Controller('Users')
export class UserController {
  constructor(private readonly authService: UserService) { }

  @Post('SignUp')
  async register(@Body() req: SignUpRequest): Promise<SignUpResponse> {
    return await this.authService.signUp(req);
  }

  @Post('SignIn')
  async login(@Body() req: SignInRequest): Promise<SignInResponse | Error> {
    return await this.authService.signIn(req);
  }

  @Post('RefreshToken')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refreshTokens(refreshToken);
  }

  @Get("GetAll")
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UsersGetAllResponse[]> {
    return this.authService.getAllUsers();
  }

  @Post('ChangePassword')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() req: ChangePasswordRequest,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    const userId = (request as any).user.userId as string;
    return await this.authService.changePassword(
      req.oldPassword,
      req.newPassword,
      userId,
      req.userId
    );
  }
}
