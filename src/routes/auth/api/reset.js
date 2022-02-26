import stringHash from 'string-hash'
import {clientPromise} from '$lib/index'
import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env['DB_NAME']

export const put = async ({ request }) => {
  const {email, password} = await request.json();
  const client = await clientPromise
  // const db = client.db('Todos')
  const db = client.db(dbName)
  const collection = db.collection('users')

	// Is there a user with such an email?
  const user = await collection.findOne({ email:email })

  if (user) {
    // change password and status
		await collection.updateOne(
			{ email: email},
      {
        $set: {
          password: stringHash(password),
          status: 'Active'
        }
      }
		)

		return {
			status: 200,
			body: {
        status: 'Success',
        user: user
			}
		}
  } else {
    return {
			status: 401,
			body: {
				message: 'REJ001: No user found.'
			}
		}
  }
}
