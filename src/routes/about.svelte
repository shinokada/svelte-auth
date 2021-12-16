<script context="module">
	import { browser, dev } from '$app/env'

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content clear">
	<h1>About this app</h1>

	<h2>sveltekit-auth</h2>
	<p>
		Simple Sveltekit-auth app made with <a href="https://kit.svelte.dev/">Sveltekit</a> and
		Mongodb Cloud top of
		<a href="https://github.com/refact0r/sveltekit-todos">refact0r/sveltekit-todos</a>.
	</p>

	<p>This includes:</p>

	<ul>
		<li>Registration</li>
		<li>Login/Logout</li>
		<li>Confirm email</li>
		<li>Reset password</li>
	</ul>

	<h2>Minimum dependencies</h2>
	<pre>
	<code>
- "@lukeed/uuid": "^2.0.0",
- "cookie": "^0.4.1", 
- "dotenv": "^10.0.0", 
- "jsonwebtoken":	"^8.5.1", 
- "jwt-decode": "^3.1.2", 
- "mongodb": "^4.1.4", 
- "nodemailer": "^6.7.2", 
- "nodemailer-sendgrid-transport": "^0.2.0", 
- "string-hash": "^1.1.3", 
- "uuid": "^8.3.2"
	</code>
</pre>

	<h2>Geting started</h2>

	<h3>Clone and run npm install</h3>

	<pre>
	<code>
		git clone git@github.com:shinokada/sveltekit-auth.git cd sveltekit-auth npm install
	</code>
</pre>

	<h3>Change `.env.example` to `.env` and update it</h3>

	<pre>
	<code>
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
	</code>
</pre>

	<p>
		You need to have a MongoDB running or create [a free new
		account](https://account.mongodb.com/account/login).
	</p>

	<p>
		I used Mailtrap for development. You need to create [a free new
		account](https://mailtrap.io/) for development.
	</p>
	<p>If you are not using Mailtrap, you need to update the `src/lib/nodemailer.js` file.</p>

	<h3>Run npm run dev</h3>
	<pre>
	<code> npm run dev </code>
</pre>
</div>

<style>
	pre code {
		background-color: #eee;
		border: 1px solid #999;
		display: block;
		padding: 20px;
		max-width: 800px;
		margin: 10px auto;
	}
	.content {
		padding: 40px;
		height: 100vh;
		margin-bottom: 40px;
	}
	.clear {
		clear: both;
	}
	h1 {
		margin-top: 0;
	}
</style>
