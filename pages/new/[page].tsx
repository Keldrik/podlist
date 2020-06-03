import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import SectionHeader from '../../components/sectionheader';
import { getNewEpisodes } from '../../logic/podlistapi';
import { episode } from '../../models/episode';
import { Pagination, paginationData } from '../../components/pagination';
import EpisodeList from '../../components/episodelist';
import Head from 'next/head';

const NewPage: NextPage<{ el: episode[]; pd: paginationData }> = ({
  el,
  pd,
}) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>
          Neue Episoden Seite {pd?.current} - Podlist.de - Das deutsche Podcast
          Verzeichnis
        </title>
        <meta
          name="description"
          content={`Alle neuen im Podcast Verzeichnis veröffentlichten Episoden nach Datum sortiert. Seite ${pd?.current} von ${pd?.max}`}
        />
        {pd ? (
          <link
            href={`https://podlist.de/new/${pd?.current}`}
            rel="canonical"
          />
        ) : null}
      </Head>
      {router.isFallback ? (
        <div className="h-64" />
      ) : (
        <section className="pt-2 pb-8">
          <SectionHeader title="Neue Episoden" />
          <EpisodeList el={el} />
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
  const elresponse = await getNewEpisodes(parseInt(params.page.toString()));
  const episodeList: episode[] = elresponse.episodes;
  const pagda: paginationData = JSON.parse(
    JSON.stringify(
      new paginationData(
        '/new/',
        '[page]',
        elresponse.lastPage,
        elresponse.page
      )
    )
  );
  return {
    props: { el: episodeList, pd: pagda },
    unstable_revalidate: 600,
  };
};

export default NewPage;
