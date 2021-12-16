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
	import { session } from '$app/stores'
	import { goto } from '$app/navigation'

	// Variables bound to respective inputs via bind:value
	let email
	let password
	let error
	// let notice

	const login = async () => {
		// Reset error from previous failed attempts
		error = undefined

		// POST method to src/routes/auth/login.js endpoint
		try {
			const res = await fetch('/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.ok) {
				const data = await res.json()
				$session.user = data.user
				goto('/')
			} else {
				const data = await res.json()
				// console.log(data)
				error = `LOS001: ${data.message}`
			}
		} catch (err) {
			console.log(err)
			error = 'LOS002: Pleas try it again.'
		}
	}
</script>

<section>
	<form on:submit|preventDefault={login}>
		<div class="heading">
			<a class="back" href="/"><i class="bi bi-arrow-left" /></a>
			<h2>Login</h2>
		</div>
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
		<button type="submit">Login</button>
		<a class="forgot" href="/auth/forgot">Forgot password</a>
	</form>
</section>

<svelte:head>
	<title>Login</title>
</svelte:head>

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
	.forgot {
		color: #fff;
		text-decoration: none;
		margin: 20px 0;
	}
</style>
