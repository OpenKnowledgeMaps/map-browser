import React from 'react';
import Moment from 'react-moment';
import Link from 'gatsby-link';
import _ from 'lodash';

export default class PostDetail extends React.Component {
  render() {
    const { post } = this.props;
    return (
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
          <img src={`${post.bigImage.childImageSharp.big.src}`} width="750" alt="map" />
        </a>

        <hr />
      </div>
    );
  }
}
