import { defineConfig, envField, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import Icons from 'unplugin-icons/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fuvp.org',
  //trailingSlash: 'always',
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Playfair Display Variable',
      cssVariable: '--font-editorial-serif',
      fallbacks: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2'],
            weight: '400 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
  integrations: [
    mdx(),
    vue({
      //workaround for https://github.com/withastro/astro/issues/9328
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
      }),
      Icons({
        compiler: 'astro',
      }),
    ],
  },
  env: {
    schema: {
      TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', default: '1x00000000000000000000AA' }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
      TRAILFORKS_APP_ID: envField.number({ context: 'server', access: 'secret', int: true }),
      TRAILFORKS_APP_SECRET: envField.string({ context: 'server', access: 'secret' }),
      TRAILFORKS_REGION_ID: envField.number({ context: 'server', access: 'secret', int: true, default: 4104 }),
    },
  },
});
