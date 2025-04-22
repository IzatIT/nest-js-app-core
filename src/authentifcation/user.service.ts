import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpRequest, SignUpResponse } from './dto/signup.dto';
import { SignInRequest, SignInResponse } from './dto/signin.dto';
import { ACCESS_TOKEN_EXPIRATION, BCRYPT_SALT_ROUNDS, REFRESH_TOKEN_EXPIRATION } from './const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async signUp(req: SignUpRequest): Promise<SignUpResponse> {
    const hashedPassword = await this.hashPassword(req.password);

    const user = this.userRepository.create({
      ...req,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.id,
      username: savedUser.username,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      isActive: savedUser.isActive,
      role: savedUser.role,
    };
  }

  async signIn(req: SignInRequest): Promise<SignInResponse | Error> {
    const user = await this.userRepository.findOne({
      where: { username: req.username },
    });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await this.validatePassword(req.password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid password');

    const accessToken = this.signToken(user.username, user.id.toString(), 'access');
    const refreshToken = this.signToken(user.username, user.id.toString(), 'refresh');

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      username: user.username,
      isActive: user.isActive,
      accessToken: accessToken,
      refreshToken: refreshToken,
      role: user.role,
    };
  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async refreshTokens(refreshToken: string): Promise<SignInResponse | Error> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) throw new BadRequestException('Invalid or expired refresh token');

      const newAccessToken = this.signToken(user.username, user.id.toString(), 'access');
      const newRefreshToken = this.signToken(user.username, user.id.toString(), 'refresh');

      user.refreshToken = newRefreshToken;
      await this.userRepository.save(user);

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        id: user.id,
        isActive: user.isActive,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        role: user.role,
      };
    } catch (err) {
      throw new BadRequestException('Invalid or expired refresh token');
    }
  }
  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
  async getByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }
  async changePassword(
    oldPassword: string,
    newPassword: string,
    requestUserId: string,
    userId?: string,
  ): Promise<{ message: string }> {
    const targetUserId = userId ?? requestUserId;

    if (!userId && !requestUserId) {
      throw new BadRequestException('No user ID provided');
    }

    const user = await this.userRepository.findOne({
      where: { id: Number(targetUserId) },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOldPasswordValid = await this.validatePassword(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(user.id, { password: hashedPassword });
    return { message: 'Password changed successfully' };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }
  private async validatePassword(plain: string, hash: string): Promise<boolean> {
    if (!plain || !hash) return false;
    return await bcrypt.compare(plain, hash);
  }
  private signToken(username: string, userId: string, type: "access" | "refresh"): string {
    return this.jwtService.sign(
      { username: username, type },
      {
        subject: userId,
        expiresIn: type === "access" ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION,
      }
    );
  }

}
