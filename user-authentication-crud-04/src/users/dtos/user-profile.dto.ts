import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/podcast/dtos/output.dto';
import { User } from '../entities/user';

@InputType()
export class UserProfileInput {
  @Field(type => Int)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field(type => String, { nullable: true })
  email?: string;
}
