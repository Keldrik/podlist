import axios from 'axios';
import { episode } from '../models/episode';
import { podcast } from '../models/podcast';

const ai = axios.create({
  baseURL: 'https://api2.podlist.de',
  timeout: 10000,
});

interface allEpisodeResponse {
  episodes: episode[];
  allCount: number;
  pageSize: number;
  page: number;
  lastPage: number;
}

interface allPodcastResponse {
  podcasts: podcast[];
  allCount: number;
  pageSize: number;
  page: number;
  lastPage: number;
}

export const getNewEpisodes = async (page: number = 1) => {
  const result = await ai.get<allEpisodeResponse>(`/episodeall?page=${page}`);
  return result.data;
};

export const getRandomPodcast = async () => {
  const result = await ai.get<podcast>('/podcastrandom');
  return result.data;
};

export const getAllPodcast = async (page: number = 1) => {
  const result = await ai.get<allPodcastResponse>(`/podcastall?page=${page}`);
  return result.data;
};

export const getSinglePodcast = async (podcasturl: string) => {
  const result = await ai.get<podcast>(`/podcastsingle?podlisturl=${podcasturl}`);
  return result.data;
};

export const getPodcastEpisodes = async (
  podcasturl: string,
  page: number = 1
) => {
  const result = await ai.get<allEpisodeResponse>(
    `/episodepodcast?podcasturl=${podcasturl}&page=${page}`
  );
  return result.data;
};

export const getSingleEpisode = async (
  podcasturl: string,
  episodeurl: string
) => {
  const result = await ai.get<episode>(`/episodesingle?podcasturl=${podcasturl}&podlisturl=${episodeurl}`);
  return result.data;
};
