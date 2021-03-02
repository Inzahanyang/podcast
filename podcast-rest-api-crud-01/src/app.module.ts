import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts/podcasts.service';
import { PodcastsController } from './podcasts/podcasts.controller';

@Module({
  imports: [],
  controllers: [PodcastsController],
  providers: [PodcastsService],
})
export class AppModule {}
