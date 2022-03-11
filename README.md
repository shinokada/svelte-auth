# Svelte-auth

Sveltekit-auth app made with <a href="https://kit.svelte.dev/">Sveltekit</a> and <a href="https://www.mongodb.com/atlas/database">Mongodb Cloud</a> on top of	<a href="https://github.com/refact0r/sveltekit-todos">refact0r/sveltekit-todos</a>. 

## This includes

<ul>
  <li>Registration</li>
  <li>Login/Logout</li>
  <li>Confirm email</li>
  <li>Reset password</li>
</ul>

## Minimum dependencies

```md
  - "@lukeed/uuid": "^2.0.0"
  - "cookie": "^0.4.1"
  - "dotenv": "^10.0.0" 
  -	"jsonwebtoken": "^8.5.1" 
  - "jwt-decode": "^3.1.2"
  - "mongodb": "^4.1.4", 
  - "nodemailer": "^6.7.2",
  - "nodemailer-sendgrid-transport": "^0.2.0", 
  - "string-hash": "^1.1.3" 
  - "uuid":	"^8.3.2"
```

## Geting started

### Clone and run npm install

```
git clone git@github.com:shinokada/sveltekit-auth.git 
cd sveltekit-auth 
npm install
```

### Change `.env.example` to `.env` and update it

```md
MONGODB_URI="your-mongodb-uri" NODE_ENV="development" SECRET="your-secret"
MAILTRAP_USER="your-mailtrap-user" MAILTRAP_PASS="your-mail-trap-pass"
DEV_URL="http://localhost:3000" EMAIL_FROM="hello@example.com" NAME_FROM="John Doe"
SENDGRIP_API="sendgrid-api-key"
```

You need to have a MongoDB running or create [a free new
account](https://account.mongodb.com/account/login). I used Mailtrap for development. You need
to create [a free new account](https://mailtrap.io/) for development. If you are not using
Mailtrap, you need to update the `src/lib/nodemailer.js` file.

### Run npm run dev

```sh
npm run dev
```