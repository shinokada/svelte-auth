# sveltekit-auth

Simple Sveltekit-auth app made with [Sveltekit](https://kit.svelte.dev/) and Mongodb Cloud top of [refact0r/sveltekit-todos](https://github.com/refact0r/sveltekit-todos).

This includes:

- Registration
- Login/Logout
- Confirm email
- Reset password

## Minimum dependencies

```sh
- "@lukeed/uuid": "^2.0.0",
- "cookie": "^0.4.1",
- "dotenv": "^10.0.0",
- "jsonwebtoken": "^8.5.1",
- "jwt-decode": "^3.1.2",
- "mongodb": "^4.1.4",
- "nodemailer": "^6.7.2",
- "nodemailer-sendgrid-transport": "^0.2.0",
- "string-hash": "^1.1.3",
- "uuid": "^8.3.2"
```

## Geting started

### Clone and run npm install

```sh
git clone git@github.com:shinokada/sveltekit-auth.git
cd sveltekit-auth
npm install
```

### Change `.env.example` to `.env` and update it

```sh
MONGODB_URI="your-mongodb-uri"
NODE_ENV="development"
SECRET="your-secret"
MAILTRAP_USER="your-mailtrap-user"
MAILTRAP_PASS="your-mail-trap-pass"
DEV_URL="http://localhost:3000"
EMAIL_FROM="hello@example.com"
NAME_FROM="John Doe"
SENDGRID_USERNAME="sendgrid-username"
SENDGRIP_API="sendgrid-api-key"
PROD_URL="production-url"
```

You need to have a MongoDB running or create [a free new account](https://account.mongodb.com/account/login).

I used Mailtrap for development. You need to create [a free new account](https://mailtrap.io/) for development.

If you are not using Mailtrap, you need to update the `src/lib/nodemailer.js` file.

### Run npm run dev

```sh
npm run dev
```
