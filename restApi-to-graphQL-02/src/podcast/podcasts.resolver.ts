import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => [Podcast])
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => [Podcast])
  createpodcast(@Args('input') createPodcastDto: CreatePodcastDto): Podcast[] {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query((returns) => Podcast)
  getPodcast(@Args('id') id: number) {
    return this.podcastsService.getPodcast(id);
  }

  @Mutation((returns) => [Podcast])
  deletePodcast(@Args('id') id: number): Podcast[] {
    return this.podcastsService.deletePodcast(id);
  }

  @Mutation((returns) => Podcast)
  updatePodcast(
    @Args('id') id: number,
    @Args('input') updatePodcastDto: UpdateEpisodeDto,
  ): Podcast {
    return this.podcastsService.updatePodcast(id, updatePodcastDto);
  }

  @Query((returns) => [Episode])
  getEpisodes(@Args('id') id: number): Episode[] {
    return this.podcastsService.getEpisodes(id);
  }

  @Mutation((returns) => Boolean)
  createEpisode(
    @Args('id') id: number,
    @Args('input') createEpisodeDto: CreateEpisodeDto,
  ): boolean {
    return this.podcastsService.createEpisode(id, createEpisodeDto);
  }

  @Mutation((returns) => Boolean)
  deleteEpisode(
    @Args('podId') podId: number,
    @Args('epiId') epiId: number,
  ): boolean {
    return this.podcastsService.deleteEpisode(podId, epiId);
  }

  @Mutation((returns) => Episode)
  findEpisode(
    @Args('podId') podId: number,
    @Args('epiId') epiId: number,
  ): Episode {
    return this.podcastsService.findEpisode(podId, epiId);
  }

  @Mutation((returns) => Episode)
  updateEpisode(
    @Args('podId') podId: number,
    @Args('epiId') epiId: number,
    @Args('input') updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.podcastsService.updateEpisode(podId, epiId, updateEpisodeDto);
  }
}
