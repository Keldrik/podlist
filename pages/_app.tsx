import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import '../styles/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as Fathom from 'fathom-client';
import Header from '../components/header';
import Footer from '../components/footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    Fathom.load('EAUUIXFA', {
      includedDomains: ['podlist.de'],
      url: 'https://asp.podlist.de/script.js',
    });
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
  return (
    <div className="container lg:w-2/3 m-auto px-4 py-2">
      <Header />
      <main className="py-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
