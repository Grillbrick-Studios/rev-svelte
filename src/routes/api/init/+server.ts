import { tx } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';
import init from '../sql/init.sql?raw';

export const GET: RequestHandler = async () => {
	await tx(async (t) => {
		await t.none(init);
	});
	return new Response('ok');
};
