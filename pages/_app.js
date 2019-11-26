import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { makeStore } from '../redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { checkServerSideCookie } from '../redux/actions/authActions';
import Router from 'next/router'
import NProgress from 'nprogress'

import { firebaseCloudMessaging } from '../utils/webPush'

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    if ('serviceWorker' in navigator) {	
      navigator.serviceWorker.register('/firebase-messaging-sw.js')	
        .then(function(registration) {	
          console.log('Service worker successfully registered.');	
          return registration;	
        })	
        .catch(function(err) {	
          console.error('Unable to register service worker.', err);	
        });	
    }
    firebaseCloudMessaging.init()
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
  checkServerSideCookie(ctx);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default withRedux(makeStore)(MyApp);
