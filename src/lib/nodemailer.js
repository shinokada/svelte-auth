import nodemailer from 'nodemailer'
// import nodemailerSendgrid from 'nodemailer-sendgrid'
import dotenv from 'dotenv'
dotenv.config()

let mail_method = process.env['MAIL_METHOD']
let user 
let pass


const host = process.env['HOST_URL']
const email_from = process.env['EMAIL_FROM']
const name_from = process.env['NAME_FROM']
let transport

if (mail_method === "mailtrap") {
  user = process.env['MAILTRAP_USER']
  pass = process.env['MAILTRAP_PASS']
  transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user,
      pass
    }
  });
} else {
  transport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env['SENDGRID_API'],
    }
  }
  //   nodemailerSendgrid({
  //     apiKey: process.env['SENDGRID_API']
  // })
  );
}

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: `${name_from} <${email_from}>`,
    // from: "Grade Chart <hello@gradechart.com>",
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Please confirm your email by clicking on the following link.</p>
        <a href=${host}/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};


export const sendForgotEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: "Grade Chart <hello@gradechart.com>",
    // from: `${name_from} <${email_from}>`,
    to: email,
    subject: "Please reset your password.",
    html: `<h1>Reset your password</h1>
        <h2>Hello ${name}</h2>
        <p>Please reset your password by clicking on the following link.</p>
        <a href=${host}/auth/reset/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};