// import Login from "./Login.svelte"
// import Register from "./Register.svelte"
import clientPromise from "./db"
import {sendForgotEmail, sendConfirmationEmail} from './nodemailer'
import {sendGridConfirmationEmail, sendGridForgotEmail} from './sendgridmailer'
import { errorStore } from './stores'
export { default as Confirm } from './Confirm.svelte'
export { default as Forgot } from './Forgot.svelte'
export { default as Login } from './Login.svelte'
export { default as Register } from './Register.svelte'
export { default as Reset } from './Reset.svelte'


export {clientPromise, sendForgotEmail, sendConfirmationEmail, sendGridConfirmationEmail, sendGridForgotEmail, errorStore}