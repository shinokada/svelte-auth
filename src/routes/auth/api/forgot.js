import { clientPromise, sendForgotEmail, sendGridForgotEmail } from '$lib/index';
import dotenv from 'dotenv'
dotenv.config()

const mail_method = process.env['MAIL_METHOD']
const dbName = process.env['DB_NAME']

export const post = async ({ request }) => {
  const { name, email } = await request.json();
	const client = await clientPromise
	// const db = client.db('Todos')
  const db = client.db(dbName)

	// Is there a user with such an email?
  const user = await db.collection('users').findOne({ email: email })

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
        name,
        email,
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
				name: name,
        email: email,
        message: "Email sent."
			}
		}
	}
}