import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { UpdatePasswordDto } from './user.types';
import { UserDB } from './user.db';

export interface CreateUserDto {
  login: string;
  password: string;
}

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
    const newUser = this.userDB.create({ login, password });
    return newUser;
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong!');
    }

    const updatedUser = this.userDB.update(id, user, { password: newPassword });
    return updatedUser;
  }

  deleteUser(id: string): void {
    const user = this.userDB.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    this.userDB.delete(id);
  }
}
