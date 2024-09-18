import React from 'react';
import { podcast } from '../models/podcast';
import Link from 'next/link';
import { getImgUrl } from '../logic/podimg';

const PodcastTile: React.FunctionComponent<{ p: podcast }> = ({ p }) => (
  <div
    className="bg-gray-800 shadow-md hover:shadow-none hover:opacity-75 transform hover:scale-95 transition duration-300 ease-in-out"
    itemScope
    itemType="http://schema.org/PodcastSeries"
  >
    <meta
      itemProp="url"
      content={`https://podlist.de/podcast/${p.podlistUrl}/all/1`}
    />
    <Link
      href="/podcast/[podcasturl]/all/[page]"
      as={`/podcast/${p.podlistUrl}/all/1`}
    >
      <img
        className="w-full h-auto"
        src={getImgUrl(p.podlistUrl)}
        loading="lazy"
        alt={p.title}
        itemProp="image"
      />
      <h3 className="p-2 truncate text-center font-semibold" itemProp="name">
        {p.title}
      </h3>
    </Link>
  </div>
);

export default PodcastTile;
