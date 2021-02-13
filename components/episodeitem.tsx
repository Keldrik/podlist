import React from 'react';
import { episode } from '../models/episode';
import { dateHeadText, timeString } from '../logic/helper';
import Link from 'next/link';
import { getImgUrl } from '../logic/podimg';

const EpisodeItem: React.FunctionComponent<{ e: episode }> = ({ e }) => (
  <div
    className="w-full md:w-1/2 md:grid md:grid-rows-1 md:grid-cols-3 xl:grid-cols-4 md:grid-flow-row md:gap-0 p-3"
    itemScope
    itemType="http://schema.org/Episode"
  >
    <meta
      itemProp="url"
      content={`https://podlist.de/podcast/${e.podcastUrl}/${e.podlistUrl}`}
    />
    <div className="w-1/4 md:w-full md:col-span-1">
      <Link
        href="/podcast/[podcasturl]/[episodeurl]"
        as={`/podcast/${e.podcastUrl}/${e.podlistUrl}`}
      >
        <a>
          <img
            className="h-auto w-full object-cover hover:opacity-75 transition duration-300 ease-in-out"
            src={getImgUrl(e.podcastUrl)}
            loading="lazy"
            alt={e.title}
          />
        </a>
      </Link>
    </div>
    <div className="w-full md:col-span-2 xl:col-span-3 pt-4 md:pt-2 pb-4 px-3 bg-gray-800">
      <div>
        <Link
          href="/podcast/[podcasturl]/[episodeurl]"
          as={`/podcast/${e.podcastUrl}/${e.podlistUrl}`}
        >
          <a>
            <h3
              className="truncate font-semibold text-lg hover:text-yellow-500 transition duration-300 ease-in-out"
              itemProp="name"
            >
              {e.title}
            </h3>
          </a>
        </Link>
      </div>
      <div
        itemProp="partOfSeries"
        itemScope
        itemType="http://schema.org/PodcastSeries"
      >
        <meta
          itemProp="url"
          content={`https://podlist.de/podcast/${e.podcastUrl}/all/1`}
        />
        <Link
          href="/podcast/[podcasturl]/all/[page]"
          as={`/podcast/${e.podcastUrl}/all/1`}
        >
          <a>
            <h4
              className="truncate font-medium pt-1 hover:text-yellow-500 transition duration-300 ease-in-out"
              itemProp="name"
            >
              {e.podcastTitle}
            </h4>
          </a>
        </Link>
      </div>
      <p className="pt-2 text-gray-500 text-sm">{`${timeString(
        new Date(e.published)
      )} - ${dateHeadText(new Date(e.published))}`}</p>
    </div>
  </div>
);

export default EpisodeItem;
