export interface owner {
  name: string;
  email: string;
}

export interface podcast {
  categories?: string[];
  title: string;
  link?: string;
  updated?: Date;
  language?: string;
  description?: string;
  subtitle?: string;
  owner?: owner;
  author?: string;
  image?: string;
  feed?: string;
  podlistUrl: string;
  podlistImage?: string;
}

export interface podcastList {
  podcasts: podcast[];
  allCount: number;
  pageSize: number;
  page: number;
  lastPage: number;
}
