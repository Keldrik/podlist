import React from 'react';
import { podcast } from '../models/podcast';
import Link from 'next/link';

const PodcastFeature: React.FunctionComponent<{ p: podcast }> = ({ p }) => (
  <div className="md:flex bg-gray-800 p-4 md:p-0 shadow-md">
    <div className="w-1/2 md:w-1/3 pr-6">
      <Link
        href="/podcast/[podcasturl]/all/[page]"
        as={`/podcast/${p.podlistUrl}/all/1`}
      >
        <a>
          <img
            className="w-full h-auto hover:opacity-75 transition duration-300 ease-in-out"
            src={p.podlistImage}
            loading="lazy"
            alt={p.title}
          />
        </a>
      </Link>
    </div>
    <div className="md:w-2/3 md:pr-6">
      <Link
        href="/podcast/[podcasturl]/all/[page]"
        as={`/podcast/${p.podlistUrl}/all/1`}
      >
        <a>
          <h3 className="text-3xl lg:text-4xl pb-1 pt-2 md:pt-4 hover:text-orange-500">
            {p.title}
          </h3>
        </a>
      </Link>
      <p className="text-gray-500 lg:text-xl md:pb-6">
        {p.description.length < 250
          ? p.description.substring(0, 250)
          : p.description.substring(0, 250) + ' ...'}
      </p>
    </div>
  </div>
);

export default PodcastFeature;
