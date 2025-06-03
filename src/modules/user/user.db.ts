import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './user.types';

@Injectable()
export class UserDB {
  private users: Map<string, User> = new Map();

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User {
    return this.users.get(id);
  }

  create({ login, password }: CreateUserDto): User {
    const id = randomUUID();
    const newUser = {
      id,
      login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.set(id, { ...newUser, password });

    return newUser;
  }

  update(id: string, user: User, options: Partial<User>): User {
    const updatedUser: User = {
      ...user,
      ...options,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users.set(id, updatedUser);

    return updatedUser;
  }

  delete(id: string): void {
    this.users.delete(id);
  }
}
