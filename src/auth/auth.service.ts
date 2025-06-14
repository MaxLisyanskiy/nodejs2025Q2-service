import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup({ login, password }: AuthDto) {
    const salt = this.configService.get<number>('CRYPT_SALT');
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.createUser({
      login,
      password: hashPassword,
    });
    return user;
  }

  async login({ login, password }: AuthDto) {
    const user = await this.userService.getUserByLogin(login);
    const passwordEqual = await bcrypt.compare(password, user.password)

    if (!user || passwordEqual) {
      throw new ForbiddenException();
    }

    return this.generateToken(user)
  }

  async refresh(refreshToken: string) {}

  private async generateToken(user: User) {
    const payload = {userId: user.id, login: user.login}

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
