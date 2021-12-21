import { sendForgotEmail } from '$lib/nodemailer';
import { sendGridForgotEmail } from '$lib/sendgridmailer';
import clientPromise from '$lib/db'
import dotenv from 'dotenv'
dotenv.config()

const mail_method = process.env['MAIL_METHOD']

export const post = async ({ body }) => {
	const client = await clientPromise
	const db = client.db('Todos')

	// Is there a user with such an email?
  const user = await db.collection('users').findOne({ email: body.email })

  if (user) {
    if (mail_method === "mailtrap") {
      await sendForgotEmail(
        user.name,
        user.email,
        user.confirmationCode
      );
        console.log('Registration is emailed.')
    }
  
    if (mail_method === "sendgrid") {
      await sendGridForgotEmail(
        body.name,
        body.email,
        user.confirmationCode
      );
        console.log('Registration is emailed.')
    }
    
  } else {
    return {
			status: 401,
			body: {
				message: 'This demo site delete all data at 12:00:00 GMT+0000. Your email is not in our database. Please register.'
			}
		}
  }

	return {
		status: 200,
		// headers,
		body: {
			user: {
				name: body.name,
        email: body.email,
        message: "Email sent."
			}
		}
	}
}