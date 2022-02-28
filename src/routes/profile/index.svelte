<script context="module">
	export async function load({ fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/auth/login'
			}
		}

		if (!session.user.name) {
			const res = await fetch('/user')
			const user = await res.json()
			session.user = {
				uid: user._id,
				name: user.name,
				email: user.email
			}
		}

		return {
			props: {
				name: session.user.name,
				email: session.user.email
			}
		}
	}
</script>

<script>
	import { goto } from '$app/navigation'
	import { session } from '$app/stores'
	import { Button } from 'flowbite-svelte'

	export let email
	export let name

	async function logout() {
		const res = await fetch('/auth/api/logout', {
			method: 'POST'
		})
		$session.user = null
		goto('/')
	}
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="content">
	<h1 class="text-xl font-medium text-gray-900 dark:text-white">Profile</h1>
	<p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
		Hello {name} you are logged in with the email {email}
	</p>
	<Button on:handleClick={logout} name="Log out">log out</Button>
</div>
