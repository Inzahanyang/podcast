import { Inject, Injectable } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { PodcastOutput } from './dtos/podcast.dto';
import { DeletePodcastOutput } from './dtos/delete-podcast.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { EpisodesOutput } from './dtos/episodes.dto';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from './dtos/delete-episode.dto';
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dtos/update-episode.dto';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
  ) {}

  getAllPodcasts(): Promise<Podcast[]> {
    return this.podcasts.find();
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastInput): Promise<CreatePodcastOutput> {
    try {
      const { id } = await this.podcasts.save(
        this.podcasts.create({
          title,
          category,
          rating: 0,
          episodes: [],
        }),
      );

      return { ok: true, id };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't create podcast",
      };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne({ id });
      if (!podcast) {
        return {
          ok: false,
          error: `${id} id podcast doesn't exist!`,
        };
      }
      return {
        ok: true,
        podcast,
      };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't find podcast by Id",
      };
    }
  }

  async deletePodcast(id: number): Promise<DeletePodcastOutput> {
    try {
      const { podcast } = await this.getPodcast(id);
      if (!podcast) {
        return { ok: false, error: "Can't find podcast By Id" };
      }
      this.podcasts.delete({ id });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't delete podcast",
      };
    }
  }

  async updatePodcast({
    podcastId,
    ...rest
  }: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
    try {
      const { podcast } = await this.getPodcast(podcastId);

      if (!podcast) {
        return { ok: false, error: "Can't find podcast by Id" };
      }

      await this.podcasts.save([
        {
          id: podcastId,
          ...podcast,
          ...rest,
        },
      ]);

      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't update podcast",
      };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const { podcast } = await this.getPodcast(podcastId);
      if (!podcast) {
        return { ok: false, error: "Can't find episodes by podcast" };
      }
      return { ok: true, episodes: podcast.episodes };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't find episode by podcastId",
      };
    }
  }

  async createEpisode({
    podcastId,
    title,
    category,
  }: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
    try {
      const newEpisode = this.episodes.create({ title, category });
      const { podcast } = await this.getPodcast(podcastId);
      newEpisode.podcast = podcast;
      const { id } = await this.episodes.save(newEpisode);
      return {
        ok: true,
        id,
      };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't create Episode",
      };
    }
  }

  async deleteEpisode({
    episodeId,
  }: DeleteEpisodeInput): Promise<DeleteEpisodeOutput> {
    try {
      await this.episodes.delete({ id: episodeId });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't delete episode",
      };
    }
  }

  async updateEpisode({
    episodeId,
    ...rest
  }: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
    try {
      const episode = this.episodes.findOne({ id: episodeId });

      this.episodes.save([
        {
          id: episodeId,
          ...episode,
          ...rest,
        },
      ]);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't update episode",
      };
    }
  }
}
