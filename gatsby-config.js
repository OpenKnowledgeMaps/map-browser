const path = require('path');

const metadata = {
  siteTitle: 'OKM Browser', // Site title.
  siteTitleAlt: 'Open Knowledge Maps Browser', // Alternative site title for SEO.
  siteLogo: '', // Logo used for SEO and manifest.
  siteUrl: 'https://openknowledgemaps.org', // Domain of your website without pathPrefix.
  pathPrefix: '/browser', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'The Open Knowledge Maps Browser', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteFBAppID: '1825356251115265', // FB Application ID for using app insights
  googleAnalyticsID: '', // GA tracking ID.
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
    googleAnalyticsID: metadata.googleAnalyticsID, // GA tracking ID.
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: metadata.googleAnalyticsID,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#c62828',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: metadata.siteTitle,
        short_name: metadata.siteTitle,
        description: metadata.siteDescription,
        start_url: metadata.pathPrefix,
        background_color: '#e0e0e0',
        theme_color: '#c62828',
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logos/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = 'GatsbyJS Material Starter';
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              }));
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields { slug }
                    frontmatter {
                      title
                      date
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: metadata.siteRss,
          },
        ],
      },
    },
  ],
};
