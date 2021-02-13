import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Error from 'next/error';

import { podcast } from '../../../models/podcast';
import { getAllPodcast } from '../../../logic/podlistapi';
import PodcastGrid from '../../../components/podcastgrid';
import { Pagination, paginationData } from '../../../components/pagination';
import SectionHeader from '../../../components/sectionheader';

const AllPage: NextPage<{
  pl: podcast[];
  pd: paginationData;
  error: { statusCode: number };
}> = ({ pl, pd, error }) => {
  if (error) {
    return <Error statusCode={error.statusCode} />;
  }
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>
          Alle Podcasts Seite {pd?.current} - Podlist.de - Das deutsche Podcast
          Verzeichnis
        </title>
        <meta
          name="description"
          content={`Alphabetisch sortierte Übersicht aller in das deutsche Podcast-Verzeichnis eingetragenen Podcasts. Seite ${pd?.current} von ${pd?.max}`}
        />
        {pd ? (
          <link
            href={`https://podlist.de/podcast/all/${pd?.current}`}
            rel="canonical"
          />
        ) : null}
      </Head>
      {router.isFallback ? (
        <div className="h-64" />
      ) : (
        <section className="pt-2 pb-8">
          <SectionHeader
            title={
              'Verzeichnis ' +
              pl[0].podlistUrl[0].toUpperCase() +
              ' - ' +
              pl[pl.length - 1].podlistUrl[0].toUpperCase()
            }
          />
          <PodcastGrid pl={pl} />
          <Pagination pd={pd} />
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
  let plresponse;
  try {
    plresponse = await getAllPodcast(parseInt(params.page.toString()));
  } catch (e) {
    return {
      props: {
        error: {
          statusCode: e.response.status ?? 500,
        },
      },
    };
  }
  const podcastList: podcast[] = plresponse.podcasts;
  const pagda: paginationData = JSON.parse(
    JSON.stringify(
      new paginationData(
        '/podcast/all/',
        '[page]',
        plresponse.lastPage,
        plresponse.page
      )
    )
  );
  return {
    props: { pl: podcastList, pd: pagda },
    revalidate: 3600,
  };
};

export default AllPage;
