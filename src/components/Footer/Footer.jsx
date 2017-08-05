import React, { Component } from 'react';
import Link from 'gatsby-link';
import UserLinks from '../UserLinks/UserLinks';
import './Footer.css';

const userLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/OpenKnowledgeMaps',
    iconClassName: 'fa fa-github',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/ok_maps',
    iconClassName: 'fa fa-twitter',
  },
  {
    label: 'Email',
    url: 'mailto:info@openknowledgemaps.org',
    iconClassName: 'fa fa-envelope',
  }];

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <UserLinks userLinks={userLinks} labeled />
        <div className="notice-container">
          <h4>Copyright © 2017. Open Knowledge Maps</h4>

          <Link to="">
            <button>Subscribe</button>
          </Link>
          <h4>
            Based on{' '}
            <a href="https://github.com/Vagr9K/gatsby-advanced-starter">
              Gatsby Advanced Starter
            </a>.
          </h4>
        </div>
      </footer>
    );
  }
}

export default Footer;
