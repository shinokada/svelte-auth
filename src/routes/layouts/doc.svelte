<script>
	import { fly } from 'svelte/transition'
	import Prism from 'prismjs'
	import 'prismjs/themes/prism.css'
	import 'prism-themes/themes/prism-holi-theme.css'
	import 'prismjs/components/prism-markdown.js'
</script>

<div class="max-w-3xl mx-auto pb-32">
	<div
		class="my-8"
		in:fly={{ y: -5, duration: 200, delay: 200 }}
		out:fly|local={{ y: 5, duration: 200 }}
	>
		<slot />
	</div>
</div>
