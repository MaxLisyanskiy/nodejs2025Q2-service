import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(User, users);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToInstance(User, user);
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository.findOne({
      where: { login },
    });

    return user;
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const user = {
      login,
      password,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    console.log(login, password, user);
    const newUser = this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(newUser);

    return plainToInstance(User, savedUser);
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      password: newPassword,
      updatedAt: new Date().getTime(),
    });

    return plainToInstance(User, updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
  }
}
