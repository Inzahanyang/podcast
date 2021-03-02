import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [
    {
      id: 1,
      title: 'funnypods',
      rating: 5,
      category: 'mola',
      episodes: [{ id: 1, title: 'ep-01' }],
    },
  ];

  getAllPodcasts() {
    return this.podcasts;
  }

  createPodcast(podcastData) {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
    });
  }

  getOnePodcast(id: string) {
    const podcast = this.podcasts.find((podcast) => podcast.id === +id);
    if (!podcast) {
      throw new NotFoundException(`Podcast Id:${id} Not Found`);
    }
    return podcast;
  }

  updatePodcast(id: string, updateData) {
    const podcast = this.getOnePodcast(id);
    this.deletePodcast(id);
    this.podcasts.push({ ...podcast, ...updateData });
  }

  deletePodcast(id: string) {
    this.getOnePodcast(id);
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== +id);
    return this.podcasts;
  }

  getAllEpisodes(id: string) {
    const podcast = this.getOnePodcast(id);
    const episodes = podcast.episodes;
    return episodes;
  }

  createEpisode(id: string, episodeData: Episode) {
    const podcast = this.getOnePodcast(id);
    if (!podcast.episodes) {
      podcast.episodes = [{ id: 1, ...episodeData }];
      return podcast.episodes;
    }

    podcast.episodes = [
      ...podcast.episodes,
      { id: podcast.episodes.length + 1, ...episodeData },
    ];
    return podcast.episodes;
  }

  updateEpisode(id: string, episodeId: string, updateData: Episode) {
    const podcast = this.getOnePodcast(id);
    this.deleteEpisode(id, episodeId);
    podcast.episodes.push({ id: episodeId, ...updateData });
  }

  deleteEpisode(id: string, episodeId: string) {
    const podcast = this.getOnePodcast(id);
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== +episodeId,
    );
    return podcast.episodes;
  }
}
