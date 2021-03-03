import { Module } from '@nestjs/common';
import { EpisodeController, PodcastsController } from './podcasts.controller';
import { PodcastsResolver } from './podcasts.resolver';
import { PodcastsService } from './podcasts.service';

@Module({
  controllers: [PodcastsController, EpisodeController],
  providers: [PodcastsService, PodcastsResolver],
})
export class PodcastsModule {}
