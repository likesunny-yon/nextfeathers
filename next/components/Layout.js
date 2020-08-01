import PropTypes from "prop-types";
import Meta from "components/Common/Meta";
import { Container, Loader } from "semantic-ui-react";
import Header from "./Common/Header";
import Footer from "./Common/MiniFooter";
import { useContext } from "react";
import UserContext from "./Context/UserContext";

import { isExpired } from "../helpers/common";

// import redirect from "../lib/redirect";

// const isExpired = (expiresAt) => {
//   return new Date() > new Date(expiresAt * 1000);
// };

const Layout = props => {
  const { user, accessToken, signOut, isReady } = useContext(UserContext);
  const { seoData, pageType, authPage, children } = props;
  const seoDataObj = seoData ? seoData : {};
  const { title, desc, summary, canonical, image } = seoDataObj;

  if (accessToken) {
    if (isExpired(accessToken)) {
      signOut();
      return null;
    }
  }

  const pageWrapperClass = pageType ? pageType + "Wrapper" : "dnaWrapper";

  const pageClass =
    pageType === "home" || pageType === "login" ? "coverPage" : "deniPage";

  return (
    <div id="deniApps" className={pageWrapperClass}>
      <Container>
        <Meta
          title={title}
          desc={desc}
          summary={summary}
          canonical={canonical}
          image={image}
        />
        <Header />
      </Container>
      <Container className={pageClass}>
        {authPage && !isReady && <Loader active></Loader>}
        {authPage && !user && isReady && <p>Please Login</p>}
        {(!authPage || !!user) && children}
      </Container>
      <Footer />
    </div>
  );
};

// Specifies the default values for props:
Layout.propTypes = {
  pageType: PropTypes.string,
  authPage: PropTypes.bool,
  children: PropTypes.node,
  seoData: PropTypes.object
};

export default Layout;
