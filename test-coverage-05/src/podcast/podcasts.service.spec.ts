import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PodcastsService', () => {
  let service: PodcastsService;
  let podcastsRepository: MockRepository<Podcast>;
  let episodesRepository: MockRepository<Episode>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PodcastsService,
        {
          provide: getRepositoryToken(Podcast),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Episode),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<PodcastsService>(PodcastsService);
    podcastsRepository = module.get(getRepositoryToken(Podcast));
    episodesRepository = module.get(getRepositoryToken(Episode));
  });
  it('should be define', () => {
    expect(service).toBeDefined();
  });

  describe('createPodcast', () => {
    const createPodcastArgs = {
      title: 'real podcast',
      category: 'news',
    };
    it('should create a new podcast', async () => {
      podcastsRepository.create.mockReturnValue(createPodcastArgs);
      podcastsRepository.save.mockResolvedValue(createPodcastArgs);

      const result = await service.createPodcast(createPodcastArgs);

      expect(podcastsRepository.create).toHaveBeenCalledTimes(1);
      expect(podcastsRepository.create).toHaveBeenCalledWith(createPodcastArgs);

      expect(podcastsRepository.save).toHaveBeenCalledTimes(1);
      expect(podcastsRepository.save).toHaveBeenCalledWith(createPodcastArgs);
    });
    it('should fail on exception', async () => {
      podcastsRepository.create.mockRejectedValue(new Error());
      const result = await service.createPodcast(createPodcastArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('getAllPodcasts', () => {
    const getAllpodcasts = [
      {
        title: 'podcast01',
        category: 'news',
      },
      {
        title: 'podcast02',
        category: 'news',
      },
    ];
    it('should get all podcasts', async () => {
      podcastsRepository.find.mockResolvedValue(getAllpodcasts);
      const result = await service.getAllPodcasts();
      expect(result).toEqual({
        ok: true,
        podcasts: getAllpodcasts,
      });
    });
    it('should fail get podcasts', async () => {
      podcastsRepository.find.mockRejectedValue(new Error());
      const result = await service.getAllPodcasts();
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('getPodcast', () => {
    const getPodcastArgs = {
      id: 1,
    };
    it('should find an existing podcast', async () => {
      podcastsRepository.findOne.mockResolvedValue(getPodcastArgs);
      const result = await service.getPodcast(1);
      expect(result).toEqual({ ok: true, podcast: getPodcastArgs });
    });
    it('should fail get podcast', async () => {
      podcastsRepository.findOne.mockRejectedValue(new Error());
      const result = await service.getPodcast(getPodcastArgs.id);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('deletePodcast', () => {
    const deletePodcastArgs = {
      id: 1,
    };
    it('should fail if podcast not exist', async () => {
      podcastsRepository.delete.mockResolvedValue(deletePodcastArgs);
      const result = await service.getPodcast(deletePodcastArgs.id);
      expect(result).toEqual({
        ok: false,
        error: 'Podcast with id 1 not found',
      });
    });
    it('should delete podcast by id', async () => {
      podcastsRepository.findOne.mockResolvedValue(deletePodcastArgs);
      podcastsRepository.delete.mockResolvedValue(deletePodcastArgs);
      const result = await service.deletePodcast(deletePodcastArgs.id);
      expect(podcastsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(podcastsRepository.findOne).toHaveBeenCalledWith(
        deletePodcastArgs,
        { relations: ['episodes'] },
      );
      expect(podcastsRepository.delete).toHaveBeenCalledTimes(1);
      expect(podcastsRepository.delete).toHaveBeenCalledTimes(
        deletePodcastArgs.id,
      );
      expect(result).toEqual({ ok: true });
    });
    it('should fail delete podcast', async () => {
      podcastsRepository.findOne.mockResolvedValue(deletePodcastArgs);
      podcastsRepository.delete.mockRejectedValue(new Error());
      const result = await service.deletePodcast(deletePodcastArgs.id);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('updatePodcast', () => {
    const updatePodcastArgs = {
      id: 1,
      payload: {
        title: 'my podcast',
        category: 'funfun',
      },
    };
    it('should fail get podcast', async () => {
      podcastsRepository.save.mockResolvedValue(updatePodcastArgs);
      const result = await service.updatePodcast(updatePodcastArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Podcast with id 1 not found',
      });
    });
    it('should update podcast', async () => {
      podcastsRepository.findOne.mockResolvedValue(updatePodcastArgs);
      podcastsRepository.save.mockResolvedValue(updatePodcastArgs);
      const result = await service.updatePodcast(updatePodcastArgs);
      expect(result).toEqual({ ok: true });
      expect(podcastsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(podcastsRepository.save).toHaveBeenCalledTimes(1);
    });
    it('should fail update podcast', async () => {
      podcastsRepository.findOne.mockResolvedValue(updatePodcastArgs);
      podcastsRepository.save.mockRejectedValue(updatePodcastArgs);
      const result = await service.updatePodcast(updatePodcastArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('getEpisodes', () => {
    const getEpisodeArgs = {
      id: 1,
    };
    it('should get episodes', async () => {
      podcastsRepository.findOne.mockResolvedValue(getEpisodeArgs);
      const result = await service.getEpisodes(getEpisodeArgs.id);
      expect(result).toEqual({ ok: true, episodes: undefined });
    });
    it('should fail get episodes', async () => {
      podcastsRepository.findOne.mockRejectedValue(new Error());
      const result = await service.getEpisodes(getEpisodeArgs.id);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('getEpisode', () => {
    const getEpisodeArgs = {
      podcastId: 1,
      episodeId: 2,
    };
    it('should not found podcast with id', async () => {
      episodesRepository.find.mockResolvedValue(getEpisodeArgs);
      const result = await service.getEpisode(getEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Podcast with id 1 not found',
      });
    });

    it('should fail found episode', async () => {
      podcastsRepository.findOne.mockResolvedValue(new Error());
      const result = await service.getEpisode(getEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('createEpisode', () => {
    const createEpisodeArgs = {
      podcastId: 1,
      title: 'funny pod',
      category: 'fun',
    };
    const podcast = {
      id: 1,
      title: 'fnc',
      categoty: 'func',
      rating: 0,
      episodes: [
        {
          title: 'hello',
          category: 'lalala',
        },
      ],
    };

    it('should fail', async () => {
      podcastsRepository.findOne.mockResolvedValue(podcast);
      const result = await service.createEpisode(createEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('deleteEpisode', () => {
    const deleteEpisodeArgs = {
      podcastId: 1,
      episodeId: 2,
    };
    it('shoud not found episode', async () => {
      episodesRepository.findOne.mockResolvedValue(deleteEpisodeArgs.episodeId);
      const result = await service.deleteEpisode(deleteEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Podcast with id 1 not found',
      });
    });
    it('shoud fail delete episode', async () => {
      episodesRepository.findOne.mockResolvedValue(new Error());
      const result = await service.deleteEpisode(deleteEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
  describe('updateEpisode', () => {
    const updateEpisodeArgs = {
      podcastId: 1,
      episodeId: 2,
      title: 'hello',
      category: 'fun',
    };
    it('should not found episode', async () => {
      episodesRepository.findOne.mockResolvedValue(updateEpisodeArgs.episodeId);
      const result = await service.updateEpisode(updateEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Podcast with id 1 not found',
      });
    });
    it('should fail update episode', async () => {
      episodesRepository.findOne.mockResolvedValue(new Error());
      const result = await service.updateEpisode(updateEpisodeArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
});
