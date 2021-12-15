import { sendForgotEmail } from '$lib/nodemailer';
import clientPromise from '$lib/db'
import dotenv from 'dotenv'
dotenv.config()

export const post = async ({ body }) => {
	const client = await clientPromise
	const db = client.db('Todos')

	// Is there a user with such an email?
  const user = await db.collection('users').findOne({ email: body.email })

  if (user) {
    sendForgotEmail(
      user.name,
      user.email,
      user.confirmationCode
    );
  } else {
    return {
			status: 401,
			body: {
				message: 'FOJ001: Error occured.'
			}
		}
  }

	return {
		status: 200,
		// headers,
		body: {
			user: {
				name: body.name,
				email: body.email
			}
		}
	}
}