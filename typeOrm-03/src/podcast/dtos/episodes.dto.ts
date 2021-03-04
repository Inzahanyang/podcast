import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';

@InputType()
export class EpisodesInput {
  @Field((type) => Int)
  podcastId: number;
}

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  @Field((type) => [Episode])
  episodes?: Episode[];
}
