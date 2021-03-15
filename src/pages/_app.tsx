import '../styles/globals.css';
import { FC } from 'react';

const MyApp: FC = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
