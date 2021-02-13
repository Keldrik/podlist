import axios from 'axios';
import { episode } from '../models/episode';
import { podcast } from '../models/podcast';

const ai = axios.create({
  baseURL: 'https://api.podlist.de',
  timeout: 2000,
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
  const result = await ai.get<allEpisodeResponse>(`/episode/all/${page}`);
  return result.data;
};

export const getRandomPodcast = async () => {
  const result = await ai.get<podcast>('/podcast/random');
  return result.data;
};

export const getAllPodcast = async (page: number = 1) => {
  const result = await ai.get<allPodcastResponse>(`/podcast/all/${page}`);
  return result.data;
};

export const getSinglePodcast = async (podcasturl: string) => {
  const result = await ai.get<podcast>(`/podcast/single/${podcasturl}`);
  return result.data;
};

export const getPodcastEpisodes = async (
  podcasturl: string,
  page: number = 1
) => {
  const result = await ai.get<allEpisodeResponse>(
    `/episode/podcast/${podcasturl}/${page}`
  );
  return result.data;
};

export const getSingleEpisode = async (
  podcasturl: string,
  episodeurl: string
) => {
  const result = await ai.get<episode>(
    `/episode/single/${podcasturl}/${episodeurl}`
  );
  return result.data;
};
