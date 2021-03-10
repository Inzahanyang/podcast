import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly InternalServerErrorOutput = {
    ok: false,
    error: 'Internal server error occurred.',
  };

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

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return { ok: false, error: 'email is not exist' };
      }
      const correctPassword = await user.checkPassword(password);
      console.log(correctPassword);

      if (!correctPassword) {
        return { ok: false, error: 'check password' };
      }

      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (e) {
      console.log(e);
      return this.InternalServerErrorOutput;
    }
  }

  async findById(id: number) {
    try {
      const user = await this.users.findOne({ id });
      return user;
    } catch (e) {
      console.log(e);
      return this.InternalServerErrorOutput;
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      if (email) {
        user.email = email;
      }

      if (password) {
        user.password = password;
      }

      await this.users.save(user);

      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return this.InternalServerErrorOutput;
    }
  }

  async seeProfile({ id }: UserProfileInput): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne(id);
      if (!user) {
        return { ok: false, error: "Couldn't find user" };
      }
      return {
        ok: true,
        email: user.email,
      };
    } catch (e) {
      console.log(e);
      return this.InternalServerErrorOutput;
    }
  }
}
