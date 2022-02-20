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

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
	<div
		class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full"
	>
		<form class="space-y-6" on:submit|preventDefault={resetpw}>
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
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			/>
			<input
				type="text"
				required
				name="confirmpw"
				placeholder="Confirm your password."
				bind:value={confirmpw}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			/>
			<input type="hidden" required name="email" bind:value={email} />
			{#if error}
				<p>{error}</p>
			{/if}
			{#if message}
				<p>{message}</p>
			{/if}
			<button
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="submit">Reset</button
			>
		</form>
	</div>
</div>
