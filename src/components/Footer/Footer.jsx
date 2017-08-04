import React, { Component } from "react";
import Link from "gatsby-link";
import UserLinks from "../UserLinks/UserLinks";
import UserInfo from "../UserInfo/UserInfo";
import "./Footer.css";
import config from "../../../data/SiteConfig";

class Footer extends Component {
  render() {
    const { siteRSS, copyright } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className="footer">
        <UserLinks config={config} labeled />
        <div className="notice-container">
          <h4>
            {copyright}
          </h4>

          <Link to={siteRSS}>
            <button>Subscribe</button>
          </Link>
          <h4>
            Based on{" "}
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
