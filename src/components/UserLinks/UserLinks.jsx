import React, { Component } from 'react';
import './UserLinks.css';

class UserLinks extends Component {
  getLinkElements() {
    const { userLinks } = this.props.config;
    const { labeled } = this.props;
    return userLinks.map(link =>
      (
        <div key={link.label}>
          <a href={link.url}>
            <i className={link.iconClassName} />
            {labeled ? `${link.label}` : ''}
          </a>
          &nbsp;&nbsp;&nbsp;
        </div>
      ));
  }
  
  render() {
    const { userLinks } = this.props.config;
    if (!userLinks) {
      return null;
    }
    return (
      <div className="user-links">
        {
          this.getLinkElements()
        }
      </div>
    );
  }
}

export default UserLinks;
