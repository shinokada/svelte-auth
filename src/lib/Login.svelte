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
	import { Alert } from 'svelte-flow'
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
			const res = await fetch('/auth/api/login', {
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

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
	<div
		class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full"
	>
		<form class="space-y-6" on:submit|preventDefault={login}>
			<div class="heading">
				<a class="back" href="/"><i class="bi bi-arrow-left" /></a>
				<h2 class="text-xl font-medium text-gray-900 dark:text-white">Login</h2>
			</div>
			<div>
				<label
					for="email"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Email</label
				>
				<input
					type="email"
					required
					name="email"
					placeholder="Enter your email"
					bind:value={email}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
				/>
			</div>
			<div>
				<label
					for="password"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your password</label
				>
				<input
					type="password"
					required
					name="password"
					placeholder="Enter your password"
					bind:value={password}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
				/>
			</div>
			{#if error}
				<div class="mt-6">
					<Alert alertId="alert-green" color="red" closeBtn="true">
						{error}
					</Alert>
				</div>
			{/if}
			<button
				type="submit"
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Log in</button
			>
			<a
				class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				href="/auth/forgot">Forgot password</a
			>
			<a
				class="ml-36 text-sm text-blue-700 hover:underline dark:text-blue-500"
				href="/auth/register">Register</a
			>
		</form>
	</div>
</div>

<svelte:head>
	<title>Login</title>
</svelte:head>
