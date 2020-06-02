import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import { episode } from '../../../../models/episode';
import { podcast } from '../../../../models/podcast';
import {
  getPodcastEpisodes,
  getSinglePodcast,
} from '../../../../logic/podlistapi';
import { Pagination, paginationData } from '../../../../components/pagination';
import SectionHeader from '../../../../components/sectionheader';
import EpisodeItem from '../../../../components/episodeitem';

const PodcastPage: NextPage<{
  p: podcast;
  el: episode[];
  pd: paginationData;
}> = ({ p, el, pd }) => {
  const router = useRouter();
  return (
    <div>
      {router.isFallback ? (
        <div className="h-64" />
      ) : (
        <section className="pt-2 pb-8">
          <h1 className="text-3xl uppercase pb-2">{p.title}</h1>
          <h2 className="pb-6 text-gray-500 text-lg">{p.subtitle}</h2>
          <p>{p.description}</p>
          <div className="pt-8 pb-4">
            <SectionHeader title="Neue Episoden" />
            <div className="flex flex-wrap">
              {el.map((e, i) => (
                <EpisodeItem e={e} />
              ))}
            </div>
            <Pagination pd={pd} />
          </div>
        </section>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const elresponse = await getPodcastEpisodes(
    params.podcasturl.toString(),
    parseInt(params.page.toString())
  );
  const el: episode[] = elresponse.episodes;
  const p: podcast = await getSinglePodcast(params.podcasturl.toString());
  const pagda: paginationData = JSON.parse(
    JSON.stringify(
      new paginationData(
        `/podcast/${params.podcasturl.toString()}/all/`,
        '[page]',
        elresponse.lastPage,
        elresponse.page
      )
    )
  );
  return {
    props: { p, el, pd: pagda },
    unstable_revalidate: 600,
  };
};

export default PodcastPage;
