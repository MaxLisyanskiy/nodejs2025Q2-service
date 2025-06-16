import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, RefreshTokenDto } from './auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/user.entity';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly CRYPT_SALT: number;
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_SECRET_REFRESH_KEY: string;
  private readonly TOKEN_EXPIRE_TIME: string;
  private readonly TOKEN_REFRESH_EXPIRE_TIME: string;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.CRYPT_SALT = +configService.getOrThrow<number>('CRYPT_SALT') || 5;
    this.JWT_SECRET_KEY = configService.getOrThrow<string>('JWT_SECRET_KEY');
    this.JWT_SECRET_REFRESH_KEY = configService.getOrThrow<string>(
      'JWT_SECRET_REFRESH_KEY',
    );
    this.TOKEN_EXPIRE_TIME =
      configService.getOrThrow<string>('TOKEN_EXPIRE_TIME');
    this.TOKEN_REFRESH_EXPIRE_TIME = configService.getOrThrow<string>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
  }

  async signup({ login, password }: AuthDto) {
    const hashPassword = await bcrypt.hash(password, this.CRYPT_SALT);
    const user = await this.userService.createUser({
      login,
      password: hashPassword,
    });
    return { id: user.id };
  }

  async login({ login, password }: AuthDto) {
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new ForbiddenException('User is not found');
    }

    const passwordEqual = await bcrypt.compare(password, user.password);

    if (!passwordEqual) {
      throw new ForbiddenException('Password is not valid');
    }

    const { accessToken, refreshToken } = this.generateToken(user);

    return { accessToken, refreshToken };
  }

  async refresh(dto: RefreshTokenDto) {
    if (!dto || !dto?.refreshToken)
      throw new UnauthorizedException('No refresh token');

    const { refreshToken } = dto;

    try {
      const { login, userId }: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.JWT_SECRET_REFRESH_KEY,
        },
      );

      if (login && userId) {
        const user = await this.userService.getUserById(userId);

        if (!user) {
          throw new NotFoundException('Пользователь не найден');
        }

        return this.generateToken(user);
      }
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private generateToken(user: User) {
    const payload: JwtPayload = { userId: user.id, login: user.login };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_KEY,
      expiresIn: this.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_REFRESH_KEY,
      expiresIn: this.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
