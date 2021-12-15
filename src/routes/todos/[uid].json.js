import clientPromise from '$lib/db'
import { ObjectId } from 'mongodb'

export async function get(request) {
	try {
		const client = await clientPromise
		// const db = client.db('Todos')
		// const collection = client.db('Todos').collection('todos')
		const todos = await client.db('Todos').collection('todos').find({ uid: request.params.uid }).toArray()

		return {
			status: 200,
			body: {
				todos
			}
		}
	} catch (err) {
		console.log(err)
		return {
			status: 500,
			body: {
				error: 'TG001: An error occured'
			}
		}
	}
}

export async function post(request) {
	try {
		const client = await clientPromise
		const db = client.db('Todos')
		const collection = db.collection('todos')
		const todo = JSON.parse(request.body)
		await collection.insertOne({
			name: todo.name,
			completed: false,
			uid: request.params.uid
		})

		return {
			status: 200,
			body: {
				status: 'Success'
			}
		}
	} catch (err) {
		console.log(err)
		return {
			status: 500,
			body: {
				error: 'TP001: An error occured'
			}
		}
	}
}

export async function put(request) {
	try {
		const client = await clientPromise
		const db = client.db('Todos')
		const collection = db.collection('todos')
		const todo = JSON.parse(request.body)
		await collection.updateOne(
			{ _id: ObjectId(todo._id) },
			{ $set: { name: todo.name, completed: todo.completed } }
		)

		return {
			status: 200,
			body: {
				status: 'Success'
			}
		}
	} catch (err) {
		console.log(err)
		return {
			status: 500,
			body: {
				error: 'TPU001: An error occured'
			}
		}
	}
}

export async function del(request) {
	try {
		const client = await clientPromise
		const db = client.db('Todos')
		const collection = db.collection('todos')
		const todo = JSON.parse(request.body)
		await collection.deleteOne({ _id: ObjectId(todo._id) })

		return {
			status: 200,
			body: {
				status: 'Success'
			}
		}
	} catch (err) {
		console.log(err)
		return {
			status: 500,
			body: {
				error: 'TD001: An error occured'
			}
		}
	}
}
