import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';

import { getSingleEpisode } from '../../../logic/podlistapi';
import { episode } from '../../../models/episode';
import AudioPlayer from '../../../components/audioplayer';

const EpisodePage: NextPage<{ e: episode; error: { statusCode: number } }> = ({
  e,
  error,
}) => {
  if (error) {
    return <Error statusCode={error.statusCode} />;
  }
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>
          {e?.title} - {e?.podcastTitle} - Podlist.de - Das deutsche Podcast
          Verzeichnis
        </title>
        <meta
          name="description"
          content={`${
            e?.summary
              ? e?.summary?.toString().substr(0, 250)
              : e?.description?.toString().substr(0, 250)
          }`}
        />
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
        <section
          className="pt-2 pb-8"
          itemScope
          itemType="http://schema.org/Episode"
        >
          <h1 className="text-3xl truncate pb-1" itemProp="name">
            {e.title}
          </h1>
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

              <h2
                className="text-xl pb-4 text-gray-400 hover:text-yellow-500"
                itemProp="name"
              >
                {e.podcastTitle}
              </h2>

            </Link>
          </div>
          <AudioPlayer episode={e}></AudioPlayer>
          <div className="pb-4 flex">
            <a href={e.enclosure.url} download>
              <div className="bg-yellow-500 uppercase text-yellow-100 text-lg font-semibold tracking-wider px-3 py-2 hover:text-yellow-800">
                Download
              </div>
            </a>
          </div>
          <div
            className="episodeContent pt-4"
            itemProp="description"
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
  let episode;
  try {
    episode = await getSingleEpisode(podcasturl, episodeurl);
  } catch (e) {
    return {
      props: {
        error: {
          statusCode: e.response.status ?? 500,
        },
      },
    };
  }
  return {
    props: { e: episode },
    revalidate: 3600,
  };
};

export default EpisodePage;
