const path = require('path');
const _ = require('lodash');
const webpackLodashPlugin = require('lodash-webpack-plugin');

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, 'post') &&
      Object.prototype.hasOwnProperty.call(node.post, 'slug')
    ) {
      slug = `/${_.kebabCase(node.post.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'post') &&
      Object.prototype.hasOwnProperty.call(node.post, 'title')
    ) {
      slug = `/${_.kebabCase(node.post.title)}`;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};



exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.jsx');
    const tagPage = path.resolve('src/templates/tag.jsx');
    const categoryPage = path.resolve('src/templates/category.jsx');
    resolve(
      graphql(
        `
        {
          allPostsJson(limit: 1000) {
            edges {
              node {
                title 
                tags 
                creator 
                creatorURL 
                id 
                query 
                category 
                service 
                timestamp 
                description 
                slug
              }
            }
          }
          site {
            siteMetadata {
              siteTitle
              siteTitleAlt
              siteLogo
              siteUrl
              pathPrefix
              siteDescription
              siteRss
              siteFBAppID
              googleAnalyticsID
              disqusShortname
              postDefaultCategoryID
              userName
              userTwitter
              userLocation
              userAvatar
              userDescription
              copyright
            }
          }
        }
      `,
      ).then((result) => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();
        result.data.allPostsJson.edges.forEach((edge) => {
          if (edge.node.tags) {
            edge.node.tags.forEach((tag) => {
              tagSet.add(tag);
            });
          }

          if (edge.node.category) {
            categorySet.add(edge.node.category);
          }

          createPage({
            path: edge.node.slug,
            component: postPage,
            context: {
              slug: edge.node.slug,
            },
          });
        });

        const tagList = Array.from(tagSet);
        tagList.forEach((tag) => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag,
            },
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach((category) => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category,
            },
          });
        });
      }),
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    config.plugin('Lodash', webpackLodashPlugin, null);
  }
};
