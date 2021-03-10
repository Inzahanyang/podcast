import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { User } from '../entities/user';

@InputType()
export class EditProfileInput extends PartialType(User) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
