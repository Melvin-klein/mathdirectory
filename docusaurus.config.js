// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Math Directory',
  tagline: 'The Math Directory community seeks to make mathematical knowledge accessible to as many people as possible. Do not hesitate to contribute!',
  url: 'https://www.mathdirectory.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Melvin-klein', // Usually your GitHub org/user name.
  projectName: 'mathdirectory', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Melvin-klein/mathdirectory/tree/main',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          admonitions: {
            tag: ':::',
            keywords: ['note', 'tip', 'info', 'caution', 'danger', 'proposition', 'definition', 'remark', 'theorem', 'corollary'],
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Melvin-klein/mathdirectory/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Math Directory',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            label: 'Learn',
            position: 'left',
            docId: 'intro'
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            type: 'dropdown',
            label: 'Contributing',
            position: 'left',
            items: [
              {
                to: '/contributing',
                label: 'About',
              },
              {
                to: '/write-a-course',
                label: 'Write a course',
              },
              {
                to: '/help-us-translate',
                label: 'Help us translate',
              },
              {
                to: '/code-of-conduct',
                label: 'Code of conduct',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                to: '/help-us-translate',
                label: 'Help us translate',
              },
            ],
          },
          {
            href: 'https://github.com/Melvin-klein/mathdirectory',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Algebra',
                to: '/docs/category/algebra',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Melvin-klein/mathdircetory',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Contributing',
                to: '/contributing',
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
