import '../styles/globals.css';

import Head from 'next/head';

import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,
					maximum-scale=1.0 , user-scalable=no"
        />
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
