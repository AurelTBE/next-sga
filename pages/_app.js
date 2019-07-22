import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import fetch from 'isomorphic-unfetch';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let props = {}
    let FETCH_URL = "http://sga-gymfeminine.fr/bo/wp-json"
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx, FETCH_URL)
      props = {...pageProps, FETCH_URL}
    }

    return { props }
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, props } = this.props;

    return (
      <Container>
        <Head>
          <title>SGA GYM FÉMININE</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
