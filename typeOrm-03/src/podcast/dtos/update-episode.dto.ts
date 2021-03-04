import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateEpisodeInput } from './create-episode.dto';

@InputType()
export class UpdateEpisodeInput extends PartialType(
  OmitType(CreateEpisodeInput, ['podcastId']),
) {
  @Field(() => Int)
  episodeId: number;
}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}
