import React from 'react';
import PostDetail from '../PostDetail/PostDetail';
import './PostListing.css';

class PostListing extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.postEdges.map(post => (
            <PostDetail post={post.node} />
          ))
        }
      </div>
    );
  }
}

export default PostListing;
