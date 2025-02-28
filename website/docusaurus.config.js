// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Matano",
  tagline: "Open source security lake platform for AWS",
  url: "https://www.matano.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "matanolabs", // Usually your GitHub org/user name.
  projectName: "matano", // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  stylesheets: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    },
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lexend:wght@400;500;600&display=swap",
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: "G-Z8SY9N8YJR",
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/matanolabs/matano/tree/main/website/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/matanolabs/matano/tree/main/website/",
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css"), require.resolve("./src/css/styles.scss")],
        },
      }),
    ],
  ],

  plugins: [
    "docusaurus-plugin-sass",
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    async function clarity(c, o) {
      return {
        name: "clarity",
        injectHtmlTags(_) {
          return {
            headTags: `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "e3hupzugjx");</script>`,
          };
        },
      };
    },
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "blog-archive",
        routeBasePath: "blog-archive",
        path: "./blog-archive",
      },
    ],
    // [
    //   '@docusaurus/plugin-ideal-image',
    //   {
    //     quality: 100,
    //     disableInDev: false,
    //   },
    // ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "VHU6P09Z0T",
        // Public API key: it is safe to commit it
        apiKey: "869b802311067306e65a90b0383f3dc1",
        indexName: "matano",
      },
      announcementBar: {
        id: "mtn-announcement",
        content: `<div id="mtn-announcement" class="flex items-center justify-center" style="gap: 7px;">
          <svg height="16px" width="16px" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
          <span>Star us <a target="_blank" rel="noopener noreferrer" href="https://github.com/matanolabs/matano"> on GitHub</a></span>
        </div>`,
        backgroundColor: "var(--ifm-color-primary-light)",
        textColor: "#ffffff",
        isCloseable: true,
      },
      navbar: {
        // title: 'Matano',
        hideOnScroll: true,
        logo: {
          alt: "Matano",
          src: "matano-logo/vector/default-monochrome-black.svg",
          srcDark: "matano-logo/vector/default-monochrome-white.svg",
          style: { height: "30px" },
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            type: "custom-githubButton",
            position: "right",
          },
          {
            href: "https://github.com/matanolabs/matano",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: "Matano",
          src: "matano-logo/vector/default-monochrome-white.svg",
          style: { height: "30px" },
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Guide",
                to: "/docs",
              },
            ],
          },
          {
            title: "Product",
            items: [
              {
                label: "Open source Elastic alternative",
                href: "#",
              },
              {
                label: "Open source Panther alternative",
                href: "#",
              },
              {
                label: "Open source SIEM alternative",
                href: "#",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/YSYfHMbfZQ",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/matanolabs",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/matanolabs/matano",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Matano Inc.<br/><span>Matano is open source software licensed under the <a href="https://github.com/matanolabs/matano/blob/main/LICENSE">Apache License 2.0</a></span>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["kotlin"],
      },
    }),
};

module.exports = config;
