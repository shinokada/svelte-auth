import * as cookie from 'cookie'

export function post() {
	return {
		headers: {
			'set-cookie': cookie.serialize('session_id', '', {
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				expires: new Date(0)
			})
		},
		body: {
			ok: true
		}
	}
}