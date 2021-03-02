import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}
  @Get()
  getAllPodcasts() {
    return this.podcastsService.getAllPodcasts();
  }
  @Post()
  createPodcast(@Body() podcastData) {
    return this.podcastsService.createPodcast(podcastData);
  }
  @Get(':id')
  getOnePodcast(@Param('id') id: string) {
    return this.podcastsService.getOnePodcast(id);
  }
  @Patch(':id')
  updatePodcast(@Param('id') id: string, @Body() updateData) {
    return this.podcastsService.updatePodcast(id, updateData);
  }
  @Delete(':id')
  deletePodcast(@Param('id') id: string) {
    return this.podcastsService.deletePodcast(id);
  }
  @Get(':id/episodes')
  getAllEpisodes(@Param('id') id: string) {
    return this.podcastsService.getAllEpisodes(id);
  }
  @Post(':id/episodes')
  createEpisode(@Param('id') id: string, @Body() episodeData) {
    return this.podcastsService.createEpisode(id, episodeData);
  }

  @Patch(':id/episodes/:episodeId')
  updateEpisode(
    @Param('id') id: string,
    @Param('episodeId') episodeId: string,
    @Body() updateData,
  ) {
    return this.podcastsService.updateEpisode(id, episodeId, updateData);
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') id: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.podcastsService.deleteEpisode(id, episodeId);
  }
}
