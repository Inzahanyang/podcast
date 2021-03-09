import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  private readonly InternalServerErrorOutput = {
    ok: false,
    error: 'Internal server error occurred.',
  };

  me() {
    return "It's me";
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const user = await this.users.findOne({ email });
      console.log(user);
      if (user) {
        return {
          ok: false,
          error: 'email already exist',
        };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return this.InternalServerErrorOutput;
    }
  }
}
