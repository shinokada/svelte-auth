// import Login from "./Login.svelte"
// import Register from "./Register.svelte"
import clientPromise from "./db"
import {sendForgotEmail, sendConfirmationEmail} from './nodemailer'
import {sendGridConfirmationEmail, sendGridForgotEmail} from './sendgridmailer'
import {errorStore} from './stores'

export {clientPromise, sendForgotEmail, sendConfirmationEmail, sendGridConfirmationEmail, sendGridForgotEmail, errorStore}