import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Empowering the next generation of roboticists, engineers, and AI practitioners',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<project-name>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'physical-ai-humanoid-robotics',
  projectName: 'textbook',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "Edit this page" links.
          editUrl:
            'https://github.com/physical-ai-humanoid-robotics/textbook/edit/main/',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "Edit this page" links.
          editUrl:
            'https://github.com/physical-ai-humanoid-robotics/textbook/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Physical AI Textbook',
        logo: {
          alt: 'Physical AI and Humanoid Robotics Book Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Book Chapters',
          },
          {
            href: 'https://github.com/physical-ai-humanoid-robotics/textbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Chapters',
            items: [
              {
                label: 'Introduction to Physical AI',
                to: '/introduction/',
              },
              {
                label: 'ROS2 Fundamentals',
                to: '/ros2/',
              },
              {
                label: 'Simulation',
                to: '/simulation/',
              },
              {
                label: 'NVIDIA Isaac',
                to: '/nvidia-isaac/',
              },
              {
                label: 'User Interfaces',
                to: '/user-interfaces/',
              },
              {
                label: 'Advanced Robotics',
                to: '/advanced-robotics/',
              },
              {
                label: 'Projects',
                to: '/projects/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/physical-ai-humanoid-robotics/textbook/discussions',
              },
              {
                label: 'Robotics Stack Exchange',
                href: 'https://robotics.stackexchange.com/',
              },
              {
                label: 'ROS Answers',
                href: 'https://answers.ros.org/questions/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Glossary',
                to: '/glossary',
              },
              {
                label: 'References',
                to: '/references',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/physical-ai-humanoid-robotics/textbook',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI and Humanoid Robotics Textbook. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'your-index-name',
        contextualSearch: true,
        // TODO: Fill in your actual Algolia `appId`, `apiKey`, and `indexName` for search to work.
      },
    }),

    // SEO and meta tags configuration
    headTags: [
      {
        tagName: 'meta',
        attributes: {
          name: 'keywords',
          content: 'robotics, humanoid robotics, artificial intelligence, physical AI, ROS, NVIDIA Isaac, robotics textbook, robotics education, AI, machine learning'
        }
      },
      {
        tagName: 'meta',
        attributes: {
          name: 'author',
          content: 'Physical AI and Humanoid Robotics Textbook'
        }
      },
      {
        tagName: 'meta',
        attributes: {
          name: 'robots',
          content: 'index, follow'
        }
      }
    ]
};

export default config;