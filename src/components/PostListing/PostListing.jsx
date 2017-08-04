import React from 'react';
import Link from 'gatsby-link';
import _ from "lodash";
import "./PostListing.css"

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        id: postEdge.node.frontmatter.id,
        query: postEdge.node.frontmatter.query,
        service: postEdge.node.frontmatter.service,
        category: postEdge.node.frontmatter.category,
        date: postEdge.node.frontmatter.date,
        description: postEdge.node.frontmatter.description,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {
        /* Your post list here. */
        postList.map(post => (
          <div key={post.id}>
            <h3>
              <Link to={`https://openknowledgemaps.org/vis.php?id=${post.id}&query=${post.query}&service=${post.service}`} target="_blank">
                {post.title}
              </Link>
            </h3>

            <a href={`/categories/${_.kebabCase(post.category)}`} className="button_green">
              cat:{post.category}
            </a>

            {post.tags.map(tag =>
              <a href={`/tags/${_.kebabCase(tag)}`} className="button">{tag}</a>
                )}
            
            <p>{post.description}</p>

            <a href={`https://openknowledgemaps.org/vis.php?id=${post.id}&query=${post.query}&service=${post.service}`} target="_blank">
              <img src={`/maps/${post.id}.png`} width="750" alt="map" />
            </a>

            <hr />
          </div>
          ))
      }
      </div>
      );
  }
}

export default PostListing;
