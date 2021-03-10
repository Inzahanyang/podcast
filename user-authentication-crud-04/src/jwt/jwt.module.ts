import { Global, Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Module({
  exports: [JwtService],
  providers: [JwtService],
})
export class JwtModule {}
