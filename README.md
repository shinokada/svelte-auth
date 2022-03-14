# Svelte-auth

Sveltekit-auth app made with <a href="https://kit.svelte.dev/">Sveltekit</a> and <a href="https://www.mongodb.com/atlas/database">Mongodb Cloud</a> on top of	<a href="https://github.com/refact0r/sveltekit-todos">refact0r/sveltekit-todos</a>. 

## This includes:

<ul>
  <li>Registration</li>
  <li>Login/Logout</li>
  <li>Confirm email</li>
  <li>Reset password</li>
</ul>

## Geting started one by one

Install SvelteKit:

```sh
npm init svelte@next sveltekit-demo 
cd sveltekit-demo
npm i
```

Install Tailwind CSS:

```sh
npx svelte-add@latest tailwindcss
npm i
```

Run it:

```sh
npm run dev
```

Install Flowbite and Flowbite-svelte

```sh
npm i -D flowbite flowbite-svelte
```



```sh
npm i -D @lukeed/uuid @sendgrid/mail cookie dotenv jsonwebtoken jwt-decode mongodb nodemailer nodemailer-sendgrid string-hash uuid
```

## Clone

```
git clone git@github.com:shinokada/svelte-auth.git 
cd svelte-auth 
npm install
```

### Change `.env.example` to `.env` and update it

```md
MONGODB_URI="your-mongodb-uri" 
NODE_ENV="development" 
SECRET="your-secret"
MAILTRAP_USER="your-mailtrap-user"
MAILTRAP_PASS="your-mail-trap-pass"
DEV_URL="http://localhost:3000" 
EMAIL_FROM="hello@example.com" 
NAME_FROM="John Doe"
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