import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuid } from 'uuid'
import {clientPromise} from '$lib/index'
import dotenv from 'dotenv'
dotenv.config()

export const post = async ({ request }) => {
  const { email, password } = await request.json();
  const client = await clientPromise
  const dbName = process.env['DB_NAME']
	const db = client.db(dbName)

	const user = await db.collection('users').findOne({ email: email })
  
	if (!user) {
		return {
			status: 401,
			body: {
				message: 'Incorrect email or password'
			}
		}
	}

	if (user.password !== stringHash(password)) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized'
			}
		}
  }

  if (user.status !== 'Active') {
		return {
			status: 401,
			body: {
				message: 'Please confirm your email before log in.'
			}
		}
  }
  
	const cookieId = uuid()
  
	await db.collection('cookies').insertOne({ cookieId: cookieId, uid: user._id })

	// Set cookie
	const headers = {
		'set-cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30,
			sameSite: 'strict',
			path: '/'
		})
	}

	return {
		status: 200,
		headers,
		body: {
			message: 'Success',
			user: {
				uid: user._id,
				name: user.name,
				email: user.email
			}
		}
	}
}
