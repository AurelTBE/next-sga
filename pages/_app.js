import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { makeStore } from '../redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Provider store={store}>
        <Head>
          <title>SGA GYM FÉMININE</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        </Provider>
      </>
    );
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // we can dispatch from here too
  ctx.store.dispatch({ type: 'URL', payload: 'http://sga-gymfeminine.fr/bo' });
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default withRedux(makeStore)(MyApp);
