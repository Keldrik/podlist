import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import { getSingleEpisode } from '../../../logic/podlistapi';
import { episode } from '../../../models/episode';
import AudioPlayer from '../../../components/audioplayer';
import Head from 'next/head';
import Link from 'next/link';

const EpisodePage: NextPage<{ e: episode }> = ({ e }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>
          {e?.title} - {e?.podcastTitle} - Podlist.de - Das deutsche Podcast
          Verzeichnis
        </title>
        {e ? (
          <link
            href={`https://podlist.de/podcast/${e.podcastUrl}/${e?.podlistUrl}`}
            rel="canonical"
          />
        ) : null}
      </Head>
      {router.isFallback ? (
        <div className="h-64" />
      ) : (
        <section className="pt-2 pb-8">
          <h1 className="text-3xl truncate pb-1">{e.title}</h1>
          <Link
            href="/podcast/[podcasturl]/all/[page]"
            as={`/podcast/${e.podcastUrl}/all/1`}
          >
            <a>
              <h2 className="text-xl pb-4 text-gray-500 hover:text-orange-500">
                {e.podcastTitle}
              </h2>
            </a>
          </Link>
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
