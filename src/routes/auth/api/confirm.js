import {clientPromise} from '$lib/index'
import * as cookie from 'cookie'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env['DB_NAME']
// todo 
// if status is Active redirect to home page

export const post = async ({ request }) => {
  const confirmationCode = await request.json();
  try {
    const client = await clientPromise
    // const db = client.db('Todos')
    const db = client.db(dbName)
    const user = await db.collection('users').findOne({
      confirmationCode
    })

    if (!user) {
      return {
        status: 404,
        body: {
          message: 'User not found'
        }
      }
    } else {
      // update user status
      updateStatus(user)

      // create a cookie and store it in the db.
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
          message: 'Updated status to Active.',
          user: {
            uid: user._id,
            name: user.name,
            email: user.email
          }
        }
      }
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      body: {
        error: 'COJ001: An error occured'
      }
    }
  }
}

async function updateStatus (user) {
  const client = await clientPromise
  // const db = client.db('Todos')
  const db = client.db(dbName)
  const collection = db.collection('users')
  await collection.updateOne(
    { _id: user._id },
    { $set: { status: "Active" } }
  )
}