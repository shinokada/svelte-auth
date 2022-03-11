<script>
	import '../app.css';
	import { session, page } from '$app/stores';
	import { DarkMode, Navbar } from 'flowbite-svelte';
	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 fixed left-3 top-3 z-50';
	let loggedInMenus = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Todos',
			href: '/todos'
		},
		{
			name: 'Profile',
			href: '/profile'
		},
		{
			name: 'GitHub',
			href: 'https://github.com/shinokada/sveltekit-auth-app'
		}
	];
	let menus = [
		{
			name: 'Login',
			href: '/auth/login'
		},
		{
			name: 'Register',
			href: '/auth/register'
		},
		{
			name: 'GitHub',
			href: 'https://github.com/shinokada/sveltekit-auth-app'
		}
	];
	let sitename = 'Svelte-auth';
	let logo = '/images/mkdir-logo.webp';
	let alt = 'Svelte-auth';
	let textsize = 'text-lg';
</script>

<DarkMode {btnClass} />

{#if $session.user}
	<main class="container mx-auto px-16 py-4 max-w-4xl">
		<Navbar menus={loggedInMenus} {sitename} {logo} {alt} {textsize} />
		<div class="my-8">
			<slot />
		</div>
	</main>
{:else}
	<div class="container mx-auto px-16 pt-4 max-w-4xl">
		<Navbar {menus} {sitename} {logo} {alt} {textsize} />
		<div class="w-full h-full my-8">
			<slot />
		</div>
	</div>
{/if}
