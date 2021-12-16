<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			}
		}
		return {}
	}
</script>

<script>
	let error
	// Variables bound to respective inputs via bind:value
	let email
	let password
	let name

	export let message

	const register = async () => {
		try {
			// POST method to src/routes/auth/register.js endpoint
			const res = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					name
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.ok) {
				message = 'User was registered successfully! Please check your email'
				email = ''
				name = ''
				password = ''
			} else {
				const data = await res.json()
				console.log('message: ', data.message)
				error = data.message
			}
		} catch (err) {
			console.log(err)
			error = 'RES001: An error occured.'
		}
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<section>
	<form on:submit|preventDefault={register}>
		{#if message}
			<div class="message">
				{message}
			</div>
		{/if}
		<div class="heading">
			<a class="back" href="/"><i class="bi bi-arrow-left" /></a>
			<h2>Register</h2>
		</div>
		<input type="text" required name="name" placeholder="Enter your name" bind:value={name} />
		<input
			type="email"
			required
			name="email"
			placeholder="Enter your email"
			bind:value={email}
		/>
		<input
			type="password"
			required
			name="password"
			placeholder="Enter your password"
			bind:value={password}
		/>
		{#if error}
			<p>{error}</p>
		{/if}
		<button type="submit">Register</button>
	</form>
</section>

<style>
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

	.message {
		color: #fff;
	}
</style>
