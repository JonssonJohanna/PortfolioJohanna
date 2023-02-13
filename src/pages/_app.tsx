import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Component {...pageProps}></Component>
    </div>
  );
}

export default MyApp;
