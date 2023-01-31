import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vue from '@astrojs/vue';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    tailwind(),
    vue({
      template: {
        // workaround for https://github.com/withastro/astro/issues/6071
        transformAssetUrls: false,
      },
    }),
    image(),
  ],
});
