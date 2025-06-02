import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser({ login, password }: CreateUserDto): Promise<Partial<User>> {
    if (!login || typeof login !== 'string') {
      throw new BadRequestException('Login is invalid!');
    }
    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Password is invalid!');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { login },
    });
    if (existingUser) {
      throw new BadRequestException('Login already exists');
    }

    const newUser = this.usersRepository.create({ login, password });
    const savedUser = await this.usersRepository.save(newUser);

    const { password: _, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto;

    if (!oldPassword || !newPassword) {
      throw new BadRequestException('Invalid update data');
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = newPassword;
    // user.version += 1;

    return await this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
  }
}
