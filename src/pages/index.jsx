import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';

class Index extends React.Component {
  render() {
    const postEdges = get(this, 'props.data.allPostsJson.edges');
    const siteMetadata = get(this, 'props.data.site.siteMetadata');
    return (
      <div className="index-container">
        <Helmet title={siteMetadata.siteTitle} />
        <SEO postEdges={postEdges} config={siteMetadata} />
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteTitle
        siteUrl
        pathPrefix
        siteDescription
      }
    }
    allPostsJson(limit: 1000) {
      edges {
        node {
            title 
            tags 
            creator 
            creatorURL 
            id 
            query 
            category 
            service 
            timestamp 
            description 
            slug
          }
       }
    }
  }
`;
