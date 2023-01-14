import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/base/layout';
import MintSection from '../components/home/mint-section';
import FaqSection from '../components/home/faq-section';
import HomeSection from '../components/home/home-section';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AbstractAction</title>
        <meta name="description" content="Mint page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Layout>
          <HomeSection/>
          <MintSection/>
          <FaqSection/>
        </Layout>
    </div>
  );
};

export default Home;
