import stringHash from 'string-hash'
// import * as cookie from 'cookie'
import { v4 as uuid } from 'uuid'
import clientPromise from '$lib/db'
import jwt from 'jsonwebtoken'
import { sendConfirmationEmail } from '$lib/nodemailer';
import { sendGridConfirmationEmail } from '$lib/sendgridmailer';
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env['SECRET']
const mail_method = process.env['MAIL_METHOD']
const dbName = process.env['DB_NAME']
// console.log('mail_method: ', mail_method)
// console.log('sendgrid api: ',process.env['SENDGRID_API'])

export const post = async ({ body }) => {
	// Connecting to DB
	// All database code can only run inside async functions as it uses await
	const client = await clientPromise
	const db = client.db(dbName)

	// Is there a user with such an email?
	const user = await db.collection('users').findOne({ email: body.email })

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

  const token = jwt.sign({ email: body.email }, secret)
  
	// Add user to DB
	// All database code can only run inside async functions as it uses await
	const uid = uuid()
	await db.collection('users').insertOne({
		_id: uid,
		name: body.name,
		email: body.email,
    password: stringHash(body.password),
    confirmationCode: token,
    status: "Pending"
  })
  
  if (mail_method === "mailtrap") {
    await sendConfirmationEmail(
      body.name,
      body.email,
      token
      );
      console.log('Mailtrap registration email is sent.')
  }

  if (mail_method === "sendgrid") {
    await sendGridConfirmationEmail(
      body.name,
      body.email,
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
				name: body.name,
				email: body.email
			}
		}
	}
}