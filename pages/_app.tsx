import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import '../styles/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const send = async () => {
      try {
        await fetch(`https://webdata.podlist.de/submit?page=${encodeURIComponent(router.asPath)}&agent=${encodeURIComponent(navigator.userAgent)}`);
      } catch (e){}
    }
    send();
  }, [router.asPath]);

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
