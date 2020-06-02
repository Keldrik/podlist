export interface enclosure {
  filesize: number;
  type: string;
  url: string;
}

export interface chapter {
  start: number;
  title: string;
}

export interface episode {
  guid: string;
  title: string;
  published: Date;
  duration: number;
  summary: string;
  subtitle: string;
  description: string;
  enclosure: enclosure;
  image: string;
  podcastUrl: string;
  podcastTitle: string;
  podlistUrl: string;
  content: string;
  chapters: chapter[];
  podcastImage: string;
}

export interface episodeList {
  episodes: episode[];
  allCount: number;
  pageSize: number;
  page: number;
  lastPage: number;
}
