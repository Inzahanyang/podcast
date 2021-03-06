import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-jwt'];

    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (decoded) {
        const user = await this.usersService.findById(decoded['id']);
        req['user'] = user;
      }
    }
    next();
  }
}
