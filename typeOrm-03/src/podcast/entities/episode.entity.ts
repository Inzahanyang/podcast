import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { extend } from '@nestjs/graphql/dist/utils';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => String)
  @Column()
  category: string;

  @Field((type) => Podcast)
  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;
}
