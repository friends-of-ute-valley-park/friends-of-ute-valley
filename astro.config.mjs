import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.friendsofutevalleypark.com',
  //trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [tailwind(), vue(), sitemap()],
});
