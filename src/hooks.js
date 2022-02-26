import { parse } from 'cookie';
import clientPromise from '$lib/db'
import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env['DB_NAME']

export const handle = async ({ event, resolve }) => {
	// Connecting to DB
	// All database code can only run inside async functions as it uses await

	// Getting cookies from request headers - all requests have cookies on them
  // const cookies = cookie.parse(request.headers.cookie || '')
  const cookies = parse(event.request.headers.get('cookie') || '');

	// If there are no cookies, the user is not authenticated
	if (cookies.session_id) {
		// Searching DB for the user with the right cookie
		// All database code can only run inside async functions as it uses await
		const client = await clientPromise
		const db = client.db(dbName)
		const cookie = await db.collection('cookies').findOne({ cookieId: cookies.session_id })
		// console.log('getting cookie')

		// If there is that user, authenticate and pass it's email to context
		if (cookie) {
			event.locals.user = {
				uid: cookie.uid
			}
		}
	}

	const response = await resolve(event)

  return response
}

// Sets session on client-side
// try console logging session in routes' load({ session }) functions
export const getSession = async (event) => {
	// Pass cookie with authenticated & email properties to session
	// console.log(request.locals.user)
	return { user: event.locals.user }
}