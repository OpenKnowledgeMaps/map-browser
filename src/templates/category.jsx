import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import PostListing from '../components/PostListing/PostListing';

export default class CategoryTemplate extends React.Component {
  render() {
    const category = get(this, 'props.pathContext.category');
    const siteMetadata = get(this, 'props.data.site.siteMetadata');
    const postEdges = get(this, 'props.data.allPostsJson.edges');
    return (
      <div className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${siteMetadata.siteTitle}`}
        />
        <h2>We found {postEdges.length} {postEdges.length === 1 ? 'map' : 'maps'}  for cat:{category}</h2>
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
      filter: { category: { eq: $category } } 
    ) {
      edges {
        node {
          title 
          tags 
          creator 
          creatorURL 
          bigImage: cover {
            childImageSharp {
              big: responsiveSizes(maxWidth: 700) {
                src
                srcSet
              }
            }
          }
          id 
          query 
          category 
          service 
          timestamp 
          description 
          fields {
            slug
          }
        }
     }
  }
}`;
