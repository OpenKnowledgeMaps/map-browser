import React from 'react';
import Link from 'gatsby-link';
import _ from 'lodash';
import Moment from 'react-moment';
import './PostListing.css';

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.slug,
        tags: postEdge.node.tags,
        title: postEdge.node.title,
        creator: postEdge.node.creator,
        creatorURL: postEdge.node.creatorURL,
        timestamp: postEdge.node.timestamp,
        id: postEdge.node.id,
        query: postEdge.node.query,
        service: postEdge.node.service,
        category: postEdge.node.category,
        description: postEdge.node.description,
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
              <p>
                Posted <Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>
                &nbsp;by&nbsp;
                <Link to={post.creatorURL} target="_blank">{post.creator}</Link>
              </p>

              <a href={`/categories/${_.kebabCase(post.category)}`} className="button_green">
              cat:{post.category}
              </a>

              {post.tags.map(tag =>
                <a key={`${post.id}+${tag}`} href={`/tags/${_.kebabCase(tag)}`} className="button">{tag}</a>,
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
