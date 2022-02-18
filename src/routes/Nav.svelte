<script>
	import { page, session } from '$app/stores'
</script>

<nav>
	<div class="header" href="/">
		<img src="svelte-logo.svg" alt="SvelteKit" />
		<h1>Sveltekit</h1>
	</div>
	<a class:active={$page.path === '/'} sveltekit:prefetch href="/">Home</a>
	{#if $session.user}
		<a class:active={$page.path === '/todos'} sveltekit:prefetch href="/todos">Todos</a>
		<a class:active={$page.path === '/profile'} sveltekit:prefetch href="/profile">Profile</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		width: 240px;
		background: #fff;
		padding: 20px 0 20px 20px;
	}

	a {
		color: #000;
		text-decoration: none;
		padding: 10px;
		margin: 3px 0;
		border-radius: 10px;
	}
	a:hover {
		background: rgb(207, 214, 255);
	}

	.header {
		display: flex;
		align-items: center;
		margin: 10px 0 20px 5px;
	}

	.header img {
		width: 32px;
		height: 32px;
		filter: saturate(0) brightness(0.6) contrast(2) invert(77%) sepia(38%) saturate(246%)
			hue-rotate(156deg) brightness(86%) contrast(89%);
	}

	h1 {
		margin: 0 0 0 12px;
		font-size: 2rem;
	}
</style>
