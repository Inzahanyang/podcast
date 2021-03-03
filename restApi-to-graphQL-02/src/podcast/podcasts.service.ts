import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  createPodcast({ title, category }: CreatePodcastDto): Podcast[] {
    const id = this.podcasts.length + 1;
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return this.podcasts;
  }

  getPodcast(id: number): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    return podcast;
  }

  deletePodcast(id: number): Podcast[] {
    this.podcasts = this.podcasts.filter((p) => p.id !== +id);
    return this.podcasts;
  }

  updatePodcast(id: number, updatePodcastDto: UpdatePodcastDto): Podcast {
    const podcast = this.getPodcast(id);

    this.deletePodcast(id);

    this.podcasts.push({ ...podcast, ...updatePodcastDto });
    return this.getPodcast(id);
  }

  getEpisodes(id: number): Episode[] {
    const podcast = this.getPodcast(id);

    return podcast.episodes;
  }

  createEpisode(id: number, { title, category }: CreateEpisodeDto): boolean {
    const podcast = this.getPodcast(id);
    const episodeId = podcast.episodes.length + 1;
    const newEpisode: Episode = { id: episodeId, title, category, rating: 0 };
    const newPodcast = this.updatePodcast(id, {
      ...podcast,
      episodes: [...podcast.episodes, newEpisode],
    });

    if (!newPodcast) {
      return false;
    }

    return true;
  }

  deleteEpisode(podId: number, epiId: number): boolean {
    const podcast = this.getPodcast(podId);

    const res = this.updatePodcast(podId, {
      episodes: podcast.episodes.filter((episode) => episode.id !== epiId),
    });

    return true;
  }

  findEpisode(podId: number, episodeId: number): Episode {
    const episodes = this.getEpisodes(podId);

    const episode = episodes.find((episode) => episode.id === episodeId);

    return episode;
  }

  updateEpisode(
    podId: number,
    epiId: number,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Episode {
    const episode = this.findEpisode(podId, epiId);

    this.deleteEpisode(podId, epiId);

    const podcast = this.getPodcast(podId);

    this.updatePodcast(podId, {
      ...podcast,
      episodes: [...podcast.episodes, { ...episode, ...updateEpisodeDto }],
    });

    return this.findEpisode(podId, epiId);
  }
}
