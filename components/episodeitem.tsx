import React from 'react';
import { episode } from '../models/episode';
import { dateHeadText, timeString } from '../logic/helper';
import Link from 'next/link';

const EpisodeItem: React.FunctionComponent<{ e: episode }> = ({ e }) => (
  <div className="w-full md:w-1/2 md:grid md:grid-rows-1 md:grid-cols-3 xl:grid-cols-4 md:grid-flow-row md:gap-0 p-3">
    <div className="w-1/4 md:w-full md:col-span-1">
      <img
        className="h-auto w-full object-cover hover:opacity-75 transition duration-300 ease-in-out"
        src={e.podcastImage}
        loading="lazy"
        alt={e.title}
      />
    </div>
    <div className="w-full md:col-span-2 xl:col-span-3 pt-4 md:pt-2 pb-4 px-3 bg-gray-800">
      <Link
        href="/podcast/[podcasturl]/[episodeurl]"
        as={`/podcast/${e.podcastUrl}/${e.podlistUrl}`}
      >
        <a>
          <h3 className="truncate font-semibold text-lg hover:text-orange-500 transition duration-300 ease-in-out">
            {e.title}
          </h3>
        </a>
      </Link>
      <h4 className="truncate font-medium pt-1 hover:text-orange-500 transition duration-300 ease-in-out">
        {e.podcastTitle}
      </h4>
      <p className="pt-2 text-gray-500 text-sm">{`${timeString(
        new Date(e.published)
      )} - ${dateHeadText(new Date(e.published))}`}</p>
    </div>
  </div>
);

export default EpisodeItem;
