import React from 'react';
import Helmet from 'react-helmet';
import UserInfo from '../components/UserInfo/UserInfo';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import './post.css';

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.post;
    const { config } = this.props.data.siteMetadata;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = this.props.location.pathname;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div>
          <h1>
            {post.title}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          <Disqus post={post} />
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PostQuery {
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
            slug
            description 
          }
       }
    }
  }`;
