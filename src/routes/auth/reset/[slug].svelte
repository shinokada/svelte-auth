<script>
	import { page } from '$app/stores'
	import jwt_decode from 'jwt-decode'

	let password
	let confirmpw
	let email
	let error
	let message
	let decoded

	const token = $page.params.slug
	decoded = jwt_decode(token)
	email = decoded.email

	const resetpw = async () => {
		try {
			const res = await fetch('/auth/reset', {
				method: 'PUT',
				body: JSON.stringify({
					email: email,
					password: password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.ok) {
				message = 'Your password is updated. Please go to login.'
			} else {
				const data = await res.json()
				console.log('message: ', data.message)
				error = data.message
			}
		} catch (err) {
			console.log(err)
			error = `RES001: An error occured. ${err}`
		}
		password = ''
		confirmpw = ''
	}
</script>

<section>
	<form on:submit|preventDefault={resetpw}>
		<div class="heading">
			<a class="back" href="/"><i class="bi bi-arrow-left" /></a>
			<h2>Reset password</h2>
		</div>
		<input
			type="text"
			required
			name="password"
			placeholder="Enter your password."
			bind:value={password}
		/>
		<input
			type="text"
			required
			name="confirmpw"
			placeholder="Confirm your password."
			bind:value={confirmpw}
		/>
		<input type="hidden" required name="email" bind:value={email} />
		{#if error}
			<p>{error}</p>
		{/if}
		{#if message}
			<p>{message}</p>
		{/if}
		<button type="submit">Reset</button>
	</form>
</section>

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
