import preprocess from 'svelte-preprocess'
import netlify from '@sveltejs/adapter-netlify'

export default {
	kit: {
		adapter: netlify(),
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
}
