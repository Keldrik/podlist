import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import { getSingleEpisode } from '../../../logic/podlistapi';
import { episode } from '../../../models/episode';
import AudioPlayer from '../../../components/audioplayer';

const EpisodePage: NextPage<{ e: episode }> = ({ e }) => {
  const router = useRouter();
  return (
    <div>
      {router.isFallback ? (
        <div className="h-64" />
      ) : (
        <section className="pt-2 pb-8">
          <h1 className="text-2xl truncate pb-1">{e.title}</h1>
          <h2 className="text-xl pb-4">{e.podcastTitle}</h2>
          <AudioPlayer episode={e}></AudioPlayer>
          <div
            className="episodeContent pt-4"
            dangerouslySetInnerHTML={{
              __html: e.content || e.description || e.summary,
            }}
          ></div>
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
  const podcasturl = params.podcasturl.toString();
  const episodeurl = params.episodeurl.toString();
  return {
    props: { e: await getSingleEpisode(podcasturl, episodeurl) },
    unstable_revalidate: 600,
  };
};

export default EpisodePage;
