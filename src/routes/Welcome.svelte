<script>
	import { Button } from 'svelte-flow'
</script>

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
	<h2 class="text-3xl font-medium text-gray-900 dark:text-white w-full text-center my-8">
		Welcome to Sveltekit auth
	</h2>
	<a href="/auth/login"><Button name="Log in" textSize="text-sm" type="blue" /></a>
	<a href="/auth/register"><Button name="Register" textSize="text-sm" type="green" /></a>
</div>
