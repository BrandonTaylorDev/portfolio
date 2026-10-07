import { redirect } from '@sveltejs/kit';

export const trailingSlash = 'ignore';

export function load() {
	redirect(301, '/');
}
