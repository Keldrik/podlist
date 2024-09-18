import React from 'react';
import { podcast } from '../models/podcast';
import Link from 'next/link';
import { getImgUrl } from '../logic/podimg';

const PodcastFeature: React.FunctionComponent<{ p: podcast }> = ({ p }) => (
  <div
    className="md:flex bg-gray-800 p-4 md:p-0 shadow-md"
    itemScope
    itemType="http://schema.org/PodcastSeries"
  >
    <meta
      itemProp="url"
      content={`https://podlist.de/podcast/${p.podlistUrl}/all/1`}
    />
    <div className="w-1/2 md:w-1/3 pr-6">
      <Link
        href="/podcast/[podcasturl]/all/[page]"
        as={`/podcast/${p.podlistUrl}/all/1`}
      >
        <img
          className="w-full h-auto hover:opacity-75 transition duration-300 ease-in-out"
          src={getImgUrl(p.podlistUrl)}
          loading="lazy"
          alt={p.title}
          itemProp="image"
        />
      </Link>
    </div>
    <div className="md:w-2/3 md:pr-6">
      <Link
        href="/podcast/[podcasturl]/all/[page]"
        as={`/podcast/${p.podlistUrl}/all/1`}
      >
        <h3
          className="text-3xl lg:text-4xl pb-1 pt-2 md:pt-4 hover:text-yellow-500"
          itemProp="name"
        >
          {p.title.substring(0, 60)}
        </h3>
      </Link>
      <p className="text-gray-400 lg:text-xl md:pb-6" itemProp="description">
        {p.description.length < 250
          ? p.description.substring(0, 250)
          : p.description.substring(0, 250) + ' ...'}
      </p>
    </div>
  </div>
);

export default PodcastFeature;
