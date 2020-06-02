import React from 'react';
import { podcast } from '../models/podcast';
import Link from 'next/link';

const PodcastTile: React.FunctionComponent<{ p: podcast }> = ({ p }) => (
  <div className="bg-gray-800 shadow-md hover:shadow-none hover:opacity-75 transform hover:scale-95 transition duration-300 ease-in-out">
    <Link
      href="/podcast/[podcasturl]/all/[page]"
      as={`/podcast/${p.podlistUrl}/all/1`}
    >
      <a>
        <img
          className="w-full h-auto"
          src={p.podlistImage}
          loading="lazy"
          alt={p.title}
        />
        <h3 className="p-2 truncate text-center font-semibold">{p.title}</h3>
      </a>
    </Link>
  </div>
);

export default PodcastTile;
