import "../styles/global.css";
import "../styles/signup.css";
import "../styles/nav.css";
import "../styles/global.css";
import "../styles/dashboard.css";
import "../styles/safezone.css";
import "../styles/alert.css";
import "../styles/landingPage.css";
import "../styles/index.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
// import "../styles/landing.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
