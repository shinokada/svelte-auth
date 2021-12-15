<script>
	import { page } from '$app/stores'

	const confirmationCode = $page.params.slug
	let email
	let error
	let message
	let data

	const forgot = async () => {
		try {
			const res = await fetch('/auth/forgot', {
				method: 'POST',
				body: JSON.stringify({
					email
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.ok) {
				message = 'Please check your email'
				email = ''
			} else {
				const data = await res.json()
				console.log('message: ', data.message)
				error = data.message
			}
		} catch (err) {
			console.log(err)
			error = `FOS001: An error occured. ${err}`
		}
	}
</script>

<section>
	<form on:submit|preventDefault={forgot}>
		<div class="heading">
			<a class="back" href="/"><i class="bi bi-arrow-left" /></a>
			<h2>Forgot password</h2>
		</div>
		<input
			type="email"
			required
			name="email"
			placeholder="Enter your email"
			bind:value={email}
		/>
		{#if data}
			<p>{data}</p>
		{/if}
		{#if data}
			<p>{message}</p>
		{/if}
		{#if error}
			<p>{error}</p>
		{/if}
		<button type="submit">Send recovery email</button>
	</form>
</section>

<svelte:head>
	<title>Forgot password</title>
</svelte:head>

<style>
	section {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	form {
		width: 400px;
		padding: 20px;
		border-radius: 18px;
		background: var(--bg-color-2);
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	input,
	button {
		margin-top: 10px;
		border-radius: 12px;
		padding: 10px;
		background: #fff;
	}

	button:hover {
		background: var(--bg-color-1-5);
	}

	.heading {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	h2 {
		width: 100%;
		text-align: center;
		margin-right: 24px;
	}

	.back {
		color: var(--sub-color);
		font-size: 24px;
		height: 24px;
	}
	.back:hover {
		color: var(--font-color);
	}
</style>
