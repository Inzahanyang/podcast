import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { extend } from '@nestjs/graphql/dist/utils';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  @Field((type) => Int)
  id?: number;
}
