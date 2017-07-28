import React from 'react';
import Link from 'gatsby-link';

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        id: postEdge.node.frontmatter.id,
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
                <Link to={`https://openknowledgemaps.org/vis.php?id=${post.id}`} target="_blank">
                  <h2>{post.title}</h2>
                </Link>
                <a href={`https://openknowledgemaps.org/vis.php?id=${post.id}`} target="_blank">
                  <img src={`/maps/${post.id}.png`} width="750" alt="map" />
                </a>
                <p>{post.description}</p>
                <hr />
              </div>
              ))
        }
      </div>
    );
  }
}

export default PostListing;
