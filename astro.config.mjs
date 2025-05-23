import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';

import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.friendsofutevalleypark.com',
  //trailingSlash: 'always',
  integrations: [
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
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        resolvers: [HeadlessUiResolver(), IconsResolver()],
      }),
      Icons({
        compiler: 'vue3',
      }),
      Icons({
        compiler: 'astro',
      }),
      tailwindcss(),
    ],
  },
});
