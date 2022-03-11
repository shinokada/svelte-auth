<script context="module">
	export const prerender = true;
</script>

<script>
	import Welcome from './Welcome.svelte';
	import { session } from '$app/stores';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if $session.user}
	<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
		<div class="p-4 m-8 bg-white  sm:p-6 lg:p-8 dark:bg-gray-800 w-full">Test</div>
	</div>
{:else}
	<Welcome />
{/if}
