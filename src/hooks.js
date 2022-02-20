import { parse } from 'cookie'
import {clientPromise} from '$lib/index'
import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env['DB_NAME']

// Sets context in endpoints
// Try console logging context in your endpoints' HTTP methods to understand the structure
export const handle = async ({ event, resolve }) => {
	// Connecting to DB
	// All database code can only run inside async functions as it uses await

	// Getting cookies from event headers - all events have cookies on them
	const cookies = parse(event.request.headers.get('cookie') || '')

	// If there are no cookies, the user is not authenticated
	if (cookies.session_id) {
		// Searching DB for the user with the right cookie
		// All database code can only run inside async functions as it uses await
		const client = await clientPromise
		// const db = client.db('Todos')
    const db = client.db(dbName)
		const cookie = await db.collection('cookies').findOne({ cookieId: cookies.session_id })
		// console.log('getting cookie')

		// If there is that user, authenticate him and pass his email to context
		if (cookie) {
			event.locals.user = {
				uid: cookie.uid
			}
		}
	}

  const response = await resolve(event)
  console.log('response from hook: ', response)
  return response
	// return {
	// 	...response,
	// 	headers: {
	// 		...response.headers
	// 		// You can add custom headers here
	// 		// 'x-custom-header': 'potato'
	// 	}
	// }
}

// Sets session on client-side
// try console logging session in routes' load({ session }) functions
export const getSession = async (event) => {
	// Pass cookie with authenticated & email properties to session
	// console.log(event.locals.user)
	return { user: event.locals.user }
}
