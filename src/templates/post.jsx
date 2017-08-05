import React from 'react';
import Helmet from 'react-helmet';
import UserInfo from '../components/UserInfo/UserInfo';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import PostDetail from '../components/PostDetail/PostDetail';
import SEO from '../components/SEO/SEO';
import './post.css';

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.postsJson;
    const config = this.props.data.siteMetadata;
    const post = postNode;
    if (!post.id) {
      post.id = this.props.location.pathname;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        {/*
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        */}
        <div>
          <PostDetail post={post} />
          {/*
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          <Disqus post={post} />
          */}
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteTitle
        siteUrl
        pathPrefix
        siteDescription
      }
    }
    postsJson(fields: { slug: { eq: $slug }}) {
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
  }`;
