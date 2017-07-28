# OKM Browser

The Open Knowledge Maps Browser is a tool to discover and rate maps that were created and shared by the community.

## Gatsby

The source code for the OKM browser is based on [Gatsby](https://github.com/gatsbyjs/gatsby) and the [gatsby-advanced-starter](https://github.com/Vagr9K/gatsby-advanced-starter).

### Development

To deploy the gatsby dev-server which supports Hot Reloading:

```
npm install
gatsby develop
```

If you encounter any problems try to remove `.cache` and `node_modules` before running `npm install`. Also I couldn't get gatsby running with anything older than `node_v8.1.0`.

## Building/Production

```
gatsby build --prefix-links // edit path prefixes in data/SiteConfig.js
```

This creates a new production build in `public`.

# To-Do

- [ ] Edit `static/robots.txt` to include your domain for the sitemap!
- [ ] Add logo in `static\logos` and edit SiteConfig.js
- [ ] Remove GA plugin & replace w/ alternative
- [ ] Remove more unnecessary features