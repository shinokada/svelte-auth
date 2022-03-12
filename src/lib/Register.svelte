<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
	import { Alert } from 'flowbite-svelte';
	let error;
	// errors is available from register.js
	export let errors;
	// Variables bound to respective inputs via bind:value
	let email;
	let password;
	let name;
	let lostPasswordLink;
	let loginLink = 'true';

	let message;
	let rememberMe;

	const register = async () => {
		try {
			// POST method to src/routes/auth/register.js endpoint
			const res = await fetch('/auth/api/register', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					name
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
				message = 'User was registered successfully! Please check your email';
				email = '';
				name = '';
				password = '';
			}
			// } else {
			// 	const data = await res.json()
			// 	// console.log('message: ', data.message)
			// 	error = data.message
			// }
		} catch (err) {
			console.log(err);
			error = 'RES001: An error occured.';
		}
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
	<div
		class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full"
	>
		<form class="space-y-6" on:submit|preventDefault={register}>
			{#if message}
				<div class="mt-6">
					<Alert alertId="alert-green" color="green" closeBtn>
						{message}
					</Alert>
				</div>
			{/if}
			<div class="heading">
				<a class="back" href="/"><i class="bi bi-arrow-left dark:text-white" /></a>
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">Register</h3>
			</div>
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Name</label
				>
				<input
					type="text"
					required
					name="name"
					placeholder="Enter your name"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					bind:value={name}
				/>
			</div>
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Email</label
				>
				<input
					type="email"
					required
					name="email"
					placeholder="Enter your email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					bind:value={email}
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
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					bind:value={password}
				/>
			</div>
			{#if errors}
				<div class="mt-6">
					<Alert alertId="alert-green" color="red" closeBtn>
						{errors}
					</Alert>
				</div>
			{/if}
			<div class="flex items-start">
				{#if rememberMe}
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
								required
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="remember" class="font-medium text-gray-900 dark:text-gray-300"
								>Remember me</label
							>
						</div>
					</div>
				{/if}
				{#if lostPasswordLink}
					<a
						href={lostPasswordLink.href}
						rel={lostPasswordLink.rel}
						class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
						>Lost Password?</a
					>
				{/if}
			</div>
			<button
				type="submit"
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Register</button
			>
			{#if loginLink}
				<a
					href="/auth/login"
					class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Go to Login</a
				>
			{/if}
		</form>
	</div>
</div>
