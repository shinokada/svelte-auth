import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport';
import dotenv from 'dotenv'
dotenv.config()

// const user = process.env['MAILTRAP_USER']
// const pass = process.env['MAILTRAP_PASS']
const host = process.env['DEV_URL']
const email_from = process.env['EMAIL_FROM']
const name_from = process.env['NAME_FROM']

const options = {
  service: 'SendGrid',
  auth: {
      api_user: process.env['SENDGRID_USERNAME'],
      api_key: process.env['SENDGRIP_API']
  }
}

const client = nodemailer.createTransport(sgTransport(options));
// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user,
//     pass
//   }
// });
// let email = 

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  client.sendMail(
    {
      from: `${name_from} <${email_from}>`,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Please confirm your email by clicking on the following link.</p>
          <a href=${host}/auth/confirm/${confirmationCode}> Click here</a>
          </div>`
    },
    function (err, info) {
            if (err ){
              console.log(error);
            }
            else {
              console.log('Message sent: ' + info.response);
            }
        }
  )


// export const sendConfirmationEmail = (name, email, confirmationCode) => {
//   transport.sendMail({
//     from: `${name_from} <${email_from}>`,
//     // from: "Grade Chart <hello@gradechart.com>",
//     to: email,
//     subject: "Please confirm your account",
//     html: `<h1>Email Confirmation</h1>
//         <h2>Hello ${name}</h2>
//         <p>Please confirm your email by clicking on the following link.</p>
//         <a href=${host}/auth/confirm/${confirmationCode}> Click here</a>
//         </div>`,
//   }).catch(err => console.log(err));
// };


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