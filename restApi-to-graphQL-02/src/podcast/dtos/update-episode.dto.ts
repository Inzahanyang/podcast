import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEpisodeDto {
  @Field((type) => String)
  title?: string;
  @Field((type) => String)
  category?: string;
  @Field((type) => Int)
  rating?: number;
}
