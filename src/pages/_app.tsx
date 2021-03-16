import '../styles/globals.css';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
