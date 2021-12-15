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
			console.log('res: ', json)
			success = 'Please log in.'
		} else {
			error = 'Not able to find your details.'
		}
		// const user = await res.json()
		// name = user.name
	})
</script>

<div class="confirm">
	<section>
		{#if success}
			<h1>Your email is confirmed. <a href="/auth/login">Go to log in</a></h1>
		{:else}
			<h1>Error</h1>
		{/if}
	</section>
</div>

<style>
	section {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.confirm {
		padding: 20px;
	}
</style>
