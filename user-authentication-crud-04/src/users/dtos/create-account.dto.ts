import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { User } from '../entities/user';

@InputType()
export class CreateAccountInput extends User {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
