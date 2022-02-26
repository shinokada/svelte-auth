<script>
	import '../app.css'
	import 'flowbite/dist/flowbite.css'
	import { session, page } from '$app/stores'
	import { fly } from 'svelte/transition'
	import { DarkMode, Navbar } from 'flowbite-svelte'
	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 fixed left-3 top-3 z-50'
	let loggedInMenus = [
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
		},
		{
			name: 'GitHub',
			link: 'https://github.com/shinokada/sveltekit-auth-app',
			rel: undefined
		}
	]
	let menus = [
		{
			name: 'Login',
			link: '/auth/login',
			rel: undefined
		},
		{
			name: 'Register',
			link: '/auth/register',
			rel: undefined
		},
		{
			name: 'GitHub',
			link: 'https://github.com/shinokada/sveltekit-auth-app',
			rel: undefined
		}
	]
	let sitename = 'Svelte-auth'
	let logo = '/images/mkdir-logo.webp'
	let alt = 'Svelte-auth'
	let textsize = 'text-lg'
</script>

<DarkMode {btnClass} />

{#if $session.user}
	<main class="container mx-auto px-16 py-4 max-w-xl">
		<Navbar menus={loggedInMenus} {sitename} {logo} {alt} {textsize} />

		<div
			class="my-8"
			in:fly={{ y: -5, duration: 200, delay: 200 }}
			out:fly|local={{ y: 5, duration: 200 }}
		>
			<slot />
		</div>
	</main>
{:else}
	<div class="container mx-auto px-16 pt-4 max-w-xl">
		<Navbar {menus} {sitename} {logo} />
		<div
			class="w-full h-full my-8"
			in:fly={{ x: -5, duration: 200, delay: 200 }}
			out:fly|local={{ x: 5, duration: 200 }}
		>
			<slot />
		</div>
	</div>
{/if}
