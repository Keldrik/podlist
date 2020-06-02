import React from 'react';
import PodcastTile from './podcasttile';
import { podcast } from '../models/podcast';

const PodcastGrid: React.FunctionComponent<{ pl: podcast[] }> = ({ pl }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {pl.map((p, i) => (
      <PodcastTile key={i} p={p} />
    ))}
  </div>
);

export default PodcastGrid;
