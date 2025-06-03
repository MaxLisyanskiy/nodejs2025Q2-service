import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdatePasswordDto } from './user.types';
import { UserDB } from './user.db';

@Injectable()
export class UserService {
  constructor(private readonly userDB: UserDB) {}

  getAllUsers(): User[] {
    return this.userDB.findAll();
  }

  getUserById(id: string): User {
    const user = this.userDB.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  createUser({ login, password }: CreateUserDto): User {
    if (!login || typeof login !== 'string') {
      throw new BadRequestException('Login is invalid!');
    }

    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Login is invalid!');
    }

    const newUser = this.userDB.create({ login, password });
    return newUser;
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.userDB.findOne(id);

    if (!oldPassword || !newPassword) {
      throw new BadRequestException('UpdatePasswordDto is invalid!');
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong!');
    }

    this.userDB.update(id, user, { password: newPassword });
  }

  deleteUser(id: string): void {
    const user = this.userDB.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    this.userDB.delete(id);
  }
}
