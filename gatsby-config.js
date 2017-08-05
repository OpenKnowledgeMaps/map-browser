const path = require('path');

const metadata = {
  siteTitle: 'OKM Browser', // Site title.
  siteTitleAlt: 'Open Knowledge Maps Browser', // Alternative site title for SEO.
  siteLogo: '', // Logo used for SEO and manifest.
  siteUrl: 'https://openknowledgemaps.org', // Domain of your website without pathPrefix.
  pathPrefix: '/browser', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'The Open Knowledge Maps Browser', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteFBAppID: '1825356251115265', // FB Application ID for using app insight
  disqusShortname: '', // Disqus shortname.
  postDefaultCategoryID: '', // Default category for posts.
  userName: '', // Username to display in the author segment.
  userTwitter: 'https://twitter.com/ok_maps', // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: '', // User location to display in the author segment.
  userAvatar: '', // User avatar to display in the author segment.
  userDescription: '', // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  copyright: 'Copyright © 2017. Open Knowledge Maps', // Copyright string for the footer of the website and RSS feed.
};

module.exports = {
  siteMetadata: {
    siteTitle: metadata.siteTitle, // Site title.
    siteTitleAlt: metadata.siteTitleAlt, // Alternative site title for SEO.
    siteLogo: metadata.siteLogo, // Logo used for SEO and manifest.
    siteUrl: metadata.siteUrl, // Domain of your website without pathPrefix.
    pathPrefix: metadata.pathPrefix,
    siteDescription: metadata.siteDescription,
    siteRss: metadata.siteRss, // Path to the RSS file.
    siteFBAppID: metadata.siteFBAppID, // FB Application ID for using app insights
    disqusShortname: metadata.disqusShortname, // Disqus shortname.
    postDefaultCategoryID: metadata.postDefaultCategoryID, // Default category for posts.
    userName: metadata.userName, // Username to display in the author segment.
    userTwitter: metadata.userTwitter, // Optionally renders "Follow Me" in the UserInfo segment.
    userLocation: metadata.userLocation, // User location to display in the author segment.
    userAvatar: metadata.userAvatar, // User avatar to display in the author segment.
    userDescription: metadata.userDescription, // User description to display in the author segment.
    // Links to social profiles/projects you want to display in the author segment/navigation bar.
    userLinks: metadata.userLinks,
    copyright: metadata.copyright, // Copyright string for the footer of the website and RSS feed.
    rssMetadata: {
      site_url: metadata.siteUrl + metadata.pathPrefix,
      feed_url: metadata.siteUrl + metadata + metadata.siteRss,
      title: metadata.siteTitle,
      description: metadata.siteDescription,
      image_url: `${metadata.siteUrl + metadata}/logos/logo-512.png`,
      author: metadata.userName,
      copyright: metadata.copyright,
    },
  },
  plugins: [
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'data'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#c62828',
      },
    },
  ],
};
