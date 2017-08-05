import React, { Component } from 'react';
import './UserLinks.css';

class UserLinks extends Component {
  getLinkElements(userLinks, labeled) {
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
    const { userLinks, labeled } = this.props;
    if (!userLinks) {
      return null;
    }
    return (
      <div className="user-links">
        {
          this.getLinkElements(userLinks, labeled)
        }
      </div>
    );
  }
}

export default UserLinks;
