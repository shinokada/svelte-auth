<script context="module">
	// export const load = async ({ url }) => ({
	// 	props: {
	// 		key: url.path
	// 	}
	// })
</script>

<script>
	import '../app.css'
	import 'flowbite/dist/flowbite.css'
	import { session, page } from '$app/stores'
	import { fly } from 'svelte/transition'
	import Nav from './Nav.svelte'
	export let key
	import { DarkMode, Navbar } from 'svelte-flow'
	let menus = [
		{
			name: 'Home',
			link: '/',
			rel: undefined
		},
		{
			name: 'Todos',
			link: '/todos',
			rel: undefined
		},
		{
			name: 'Profile',
			link: '/profile',
			rel: undefined
		}
	]
</script>

<DarkMode />

{#if $session.user}
	<Navbar {menus} />
	<main class="with-nav">
		{#key key}
			<div
				class="content-container"
				in:fly={{ y: -5, duration: 200, delay: 200 }}
				out:fly|local={{ y: 5, duration: 200 }}
			>
				<slot />
			</div>
		{/key}
	</main>
{:else}
	<div class="container mx-auto px-4 pt-4">
		{#key key}
			<div
				class="w-full h-full"
				in:fly={{ x: -5, duration: 200, delay: 200 }}
				out:fly|local={{ x: 5, duration: 200 }}
			>
				<slot />
			</div>
		{/key}
	</div>
{/if}
