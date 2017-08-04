import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import Footer from '../../src/components/Footer/Footer';
import './index.css';

class MainLayout extends React.Component {
  render() {
    const children = get(this, 'props.children');

    return (
      <div>
        <Helmet>
          <title>OKM Browser</title>
          <meta name="description" content="The Open Knowledge Maps Browser" />
        </Helmet>

        <h1>The Open Knowledge Maps Browser</h1>
        <p>It is a really great browser. Look at all these great maps. Pls upvote.</p>

        {children()}

        <Footer />
      </div>
    );
  }
}

export default MainLayout;
