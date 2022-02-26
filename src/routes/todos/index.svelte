<script context="module">
	export async function load({ fetch, session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			}
		}
		const res = await fetch(`/todos/${session.user.uid}.json`)
		const json = await res.json()
		return { props: { todos: json.todos, user: session.user } }
	}
</script>

<script>
	export let todos
	export let user
	let text = ''

	// $: console.log(todos)

	async function loadTodos() {
		const res = await fetch(`/todos/${user.uid}.json`)
		const json = await res.json()
		todos = json.todos
	}

	async function addTodo() {
		if (text == '') {
			return
		}
		const todo = {
			name: text,
			completed: false
		}

		await fetch(`/todos/${user.uid}.json`, {
			method: 'POST',
			body: JSON.stringify(todo)
		})
		text = ''
		loadTodos()
	}

	async function completeTodo(index) {
		todos[index].completed = !todos[index].completed
		await fetch(`/todos/${user.uid}.json`, {
			method: 'PUT',
			body: JSON.stringify(todos[index])
		})
	}

	async function editTodo(todo, e) {
		if (e.target.value == '') {
			e.target.value = todo.name
			return
		}
		todo.name = e.target.value
		await fetch(`/todos/${user.uid}.json`, {
			method: 'PUT',
			body: JSON.stringify(todo)
		})
		loadTodos()
	}

	async function deleteTodo(index) {
		const todo = todos.splice(index, 1)[0]
		todos = todos
		await fetch(`/todos/${user.uid}.json`, {
			method: 'DELETE',
			body: JSON.stringify(todo)
		})
	}

	function blurOnEnter(event) {
		if (event.keyCode === 13) {
			event.target.blur()
		}
	}
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
	<div
		class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full"
	>
		<div class="heading-container">
			<h1>Todos</h1>
		</div>
		<div class="new-container">
			<form class="new" on:submit|preventDefault={addTodo}>
				<button class="add" type="submit"><i class="bi bi-plus-lg" /></button>
				<input class="name" type="text" placeholder="Add a todo" bind:value={text} />
			</form>
		</div>
		<div class="list">
			{#each todos as todo, index}
				{#if !todo.completed}
					<div class="todo">
						<button
							class={todo.completed ? 'checkbox checked' : 'checkbox'}
							on:click={() => completeTodo(index)}
						>
							<i class="bi bi-check-lg" />
						</button>
						<input
							class="name"
							type="text"
							value={todo.name}
							on:change={(e) => editTodo(todo, e)}
							on:keydown={(e) => blurOnEnter(e)}
						/>
						<button class="delete" on:click={() => deleteTodo(index)}
							><i class="bi bi-x-lg" /></button
						>
					</div>
				{/if}
			{/each}
			{#if todos.find((todo) => todo.completed)}
				<h2>Completed</h2>
			{/if}
			{#each todos as todo, index}
				{#if todo.completed}
					<div class="todo completed">
						<button
							class={todo.completed ? 'checkbox checked' : 'checkbox'}
							on:click={() => completeTodo(index)}
						>
							<i class="bi bi-check-lg" />
						</button>
						<input
							class="name"
							type="text"
							value={todo.name}
							on:change={(e) => editTodo(todo, e)}
							on:keydown={(e) => blurOnEnter(e)}
						/>
						<button class="delete" on:click={() => deleteTodo(index)}
							><i class="bi bi-x-lg" /></button
						>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
