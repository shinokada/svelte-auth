import {clientPromise} from '$lib/index'
import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env['DB_NAME']

export const get = async (request) => {
  // request value from hooks, event.locals.user
  // do'not use {request} here. You can't get event.locals.user
  // console.log('body here: ', request)
	// Connecting to DB
	// All database code can only run inside async functions as it uses await
	const client = await clientPromise
	// const db = client.db('Todos')
  const db = client.db(dbName)

	// Checking for auth coming from hooks' handle({ request, resolve })
	if (!request.locals.user) {
		return {
			status: 401,
			body: {
				message: 'You are unauthorized'
			}
		}
	}

	const user = await db.collection('users').findOne({ _id: request.locals.user.uid })

	if (!user) {
		return {
			status: 404,
			body: {
				message: 'User not found'
			}
		}
	}

	// Find a proper way in findOne(), I've run out of gas ;)
	delete user.password

	return {
		status: 200,
		body: user
	}
}
