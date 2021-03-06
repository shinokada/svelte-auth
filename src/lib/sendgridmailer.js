import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()

const host = process.env['HOST_URL']
const email_from = process.env['EMAIL_FROM']
const SENDGRID_API_KEY = process.env['SENDGRID_API']

export const sendGridConfirmationEmail = async (name, email, confirmationCode) => {
  await sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: `${email_from}`,
    subject: "Please confirm your account",
    text: `Email Confirmation: Hello ${name}.
    Please confirm your email by clicking on the following link.
    Click here, ${host}/auth/confirm/${confirmationCode}`,
    html:`<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Please confirm your email by clicking on the following link.</p>
    <a href=${host}/auth/confirm/${confirmationCode}> Click here</a>
    </div>`,
  }
  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

export const sendGridForgotEmail = async (name, email, confirmationCode) => {
  await sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    from: `${email_from}`,
    to: email,
    subject: "Please reset your password.",
    text: `Reset your password: Hello ${name}.
    Please reset your password by clicking on the following link.
    Click here, ${host}/auth/reset/${confirmationCode}`,
    html: `<h1>Reset your password</h1>
        <h2>Hello ${name}</h2>
        <p>Please reset your password by clicking on the following link.</p>
        <a href=${host}/auth/reset/${confirmationCode}> Click here</a>
        </div>`,
  }
  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}