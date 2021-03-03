import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePodcastDto {
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  category: string;
}
