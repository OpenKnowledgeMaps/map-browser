import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import PostListing from '../components/PostListing/PostListing';

export default class TagTemplate extends React.Component {
  render() {
    const tag = get(this, 'props.pathContext.tag');
    const postEdges = get(this, 'props.data.allPostsJson.edges');
    const siteMetadata = get(this, 'props.data.site.siteMetadata');
    return (
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" | ${siteMetadata.siteTitle}`} />
        <h2>We found {postEdges.length} {postEdges.length === 1 ? 'map' : 'maps'}  for tag:{tag}</h2>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        siteTitle
        siteUrl
        pathPrefix
        siteDescription
      }
    }
    allPostsJson(
      limit: 1000
      sort: { fields: [timestamp], order: DESC } 
      filter: { tag: { eq: $tag } } 
    ) {
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
  }`;