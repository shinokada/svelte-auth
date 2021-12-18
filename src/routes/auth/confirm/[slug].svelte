<script context="module">
	// export async function load(ctx) {
	// 	let slug = ctx.page.params.slug
	// 	return { props: { slug } }
	// }
</script>

<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	const confirmationCode = $page.params.slug
	let success

	onMount(async () => {
		const res = await fetch('/auth/confirm', {
			method: 'POST',
			body: JSON.stringify(confirmationCode)
		})
		if (res.ok) {
			// get user details and save it to session then redirect to login
			// const res = await fetch('/user')
			const json = await res.json()
			// console.log('res: ', json)
			success = 'Please log in.'
		} else {
			error = 'Not able to find your details.'
		}
		// const user = await res.json()
		// name = user.name
	})
</script>

<section>
	<div class="confirm">
		{#if success}
			<h1>Your email is confirmed.</h1>
			<h2><a href="/auth/login">Go to Login</a></h2>
		{:else}
			<h1>Error</h1>
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100vh;
		display: flex;
		color: #fff;
		justify-content: center;
		align-items: center;
	}
	.confirm {
		padding: 20px;
		color: blue;
		width: 400px;
		padding: 20px;
		border-radius: 18px;
		background: rgb(51, 114, 162);
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	h1,
	h2 {
		color: rgb(255, 255, 255);
	}
	a {
		color: rgb(149, 158, 255);
		text-decoration: none;
	}
	a:hover {
		color: #fff;
	}
</style>
