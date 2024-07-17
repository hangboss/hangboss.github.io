import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

const pageSize = 10

export default defineConfig({
  title: "Saul Stone's Blog",
  appearance: false,
  base: '/blog',
  cacheDir: './node_modules/vitepress_cache',
  description: "Saul Stone's Blog",
  ignoreDeadLinks: true,
  head: [['link', { rel: 'icon', href: '/blog/favicon.ico' }]],
  themeConfig: {
    posts: await getPosts(pageSize),
    comment: {
      repo: 'hangboss/hangboss.github.io',
      themes: 'github-light',
      issueTerm: 'pathname'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/pages/tags' }
      // { text: 'Text', link: 'http://somesitename.com' }  -- External link test
    ],
    search: {
      provider: 'local'
    }
    //outline:[2,3],
  },
  srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

  vite: {
    //build: { minify: false }
    server: { port: 5000 }
  }
  /*
      optimizeDeps: {
          keepNames: true
      }
      */
})
