import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(userId: number): string {
    return jwt.sign({ id: userId }, process.env.PRIVATE_KEY);
  }
  verify(token: string) {
    try {
      return jwt.verify(token, process.env.PRIVATE_KEY);
    } catch (e) {
      console.log(e);
    }
  }
}
