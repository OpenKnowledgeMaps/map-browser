import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Tags from '../components/Tags/Tags';
import config from '../../data/SiteConfig';

class TagsPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Helmet title={`Tags | ${config.siteTitle}`} />
        <Tags />
      </div>
    );
  }
}

export default TagsPage;
