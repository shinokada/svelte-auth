<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { Button, Alert } from 'flowbite-svelte'

	const confirmationCode = $page.params.slug
	let success

	onMount(async () => {
		const res = await fetch('/auth/api/confirm', {
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

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
	<div
		class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full"
	>
		{#if success}
			<h1 class="text-xl w-full mb-4 font-medium text-gray-900 dark:text-white">
				Your email is confirmed.
			</h1>
			<a href="/auth/login" class="py-4">
				<Button name="Go to Login" textSize="text-sm" />
			</a>
		{:else}
			<Alert alertId="alert-red" color="red" closeBtn="true">Error</Alert>
		{/if}
	</div>
</div>
