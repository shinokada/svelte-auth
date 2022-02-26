import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from 'svelte-preprocess'
import netlify from '@sveltejs/adapter-netlify'

export default {
  extensions: [".svelte", ...mdsvexConfig.extensions],
	kit: {
		adapter: netlify(),
	},

	preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],
}
