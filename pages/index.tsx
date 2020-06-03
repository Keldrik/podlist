import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import PodcastGrid from '../components/podcastgrid';
import { podcast } from '../models/podcast';
import { getNewEpisodes, getRandomPodcast } from '../logic/podlistapi';
import SectionHeader from '../components/sectionheader';
import PodcastFeature from '../components/podcastfeature';
import Head from 'next/head';

const HomePage: NextPage<{ rp: podcast; pl: podcast[] }> = ({ rp, pl }) => (
  <div>
    <Head>
      <title>Podlist.de - Das deutsche Podcast Verzeichnis</title>
      <meta
        name="description"
        content="Podlist ist ein deutschsprachiges Podcast-Verzeichnis. Mit der Übersicht und einer Suchfunktion findest du alle Podcasts, die du hören willst."
      />
      <link href="https://podlist.de" rel="canonical" />
    </Head>
    <section className="pt-2 pb-8">
      <SectionHeader title="Kennst du den schon?" />
      <PodcastFeature p={rp} />
    </section>
    <section className="pb-6">
      <SectionHeader title="Aktuelle Podcasts" />
      <PodcastGrid pl={pl} />
    </section>
  </div>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const randomPodcast = await getRandomPodcast();
  const episodeResult = await getNewEpisodes();
  const podcastList: podcast[] = [];
  episodeResult.episodes.forEach((e, i) => {
    if (i < 8) {
      podcastList.push({
        title: e.podcastTitle,
        podlistImage: e.podcastImage,
        podlistUrl: e.podcastUrl,
      });
    }
  });
  return {
    props: { rp: randomPodcast, pl: podcastList },
    unstable_revalidate: 600,
  };
};

export default HomePage;
