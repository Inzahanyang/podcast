import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Episode } from './episode.entity';

@ObjectType()
export class Podcast {
  @Field((type) => Number)
  id: number;
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  category: string;
  @Field((type) => Int)
  rating: number;
  @Field((type) => Episode)
  episodes: Episode[];
}
