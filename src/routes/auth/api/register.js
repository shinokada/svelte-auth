import stringHash from 'string-hash'
// import * as cookie from 'cookie'
import { v4 as uuid } from 'uuid'
import { clientPromise, sendConfirmationEmail, sendGridConfirmationEmail } from '$lib/index'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env['SECRET']
const mail_method = process.env['MAIL_METHOD']
const dbName = process.env['DB_NAME']
// console.log('mail_method: ', mail_method)
// console.log('sendgrid api: ',process.env['SENDGRID_API'])

export const post = async ({ request }) => {
  console.log('request: ', request)
  const body = await request.formData()
  console.log("body: ", body)
	// Connecting to DB
	// All database code can only run inside async functions as it uses await
	const client = await clientPromise
	const db = client.db(dbName)

  
  
	// Is there a user with such an email?
	const user = await db.collection('users').findOne({ email: request.email })

	// If there is, either send status 409 Conflict and inform the user that their email is already taken
	// or send status 202 or 204 and tell them to double-check on their credentials and try again - it is considered more secure
  if (user) {
		return {
			status: 409,
			body: {
				message: 'User with that email already exists'
			}
		}
	}

  const token = jwt.sign({ email: request.email }, secret)
  
	// Add user to DB
	// All database code can only run inside async functions as it uses await
	const uid = uuid()
	await db.collection('users').insertOne({
		_id: uid,
		name: request.name,
		email: request.email,
    password: stringHash(request.password),
    confirmationCode: token,
    status: "Pending"
  })
  
  if (mail_method === "mailtrap") {
    await sendConfirmationEmail(
      request.name,
      request.email,
      token
      );
      console.log('Mailtrap registration email is sent.')
  }

  if (mail_method === "sendgrid") {
    await sendGridConfirmationEmail(
      request.name,
      request.email,
      token
    );
      console.log('SendGrid registration is emailed.')
  }

	return {
		status: 200,
		// headers,
		body: {
			user: {
				uid: uid,
				name: request.name,
				email: request.email
			}
		}
	}
}