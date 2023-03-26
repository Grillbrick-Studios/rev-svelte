/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultSpaceID, getLastMutationID, tx } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { PullRequest } from 'replicache';

export const POST: RequestHandler = async ({ request: req }) => {
	const pull = req.body as unknown as PullRequest;
	console.log(`Processing pull`, JSON.stringify(pull));
	const t0 = Date.now();

	try {
		// Read all data in a single transaction so it's consistent.
		await tx(async (t) => {
			// Get current version for space.
			const version = (
				await t.one('select version from space where key = $1', defaultSpaceID)
			).version;

			// Get limit for requesting client.
			const isExistingClient = pull.lastMutationID > 0;
			const lastMutationID = await getLastMutationID(
				t,
				pull.clientID,
				isExistingClient,
			);

			// Get changed domain objects since requested version.
			const fromVersion = pull.cookie ?? 0;
			const changed = await t.manyOrNone(
				'select id, sender, content, ord, deleted from message where version > $1',
				fromVersion,
			);

			// Build and return response.
			const patch = [];
			for (const row of changed) {
				if (row.deleted) {
					if (fromVersion > 0) {
						patch.push({
							op: 'del',
							key: `message/${row.id}`,
						});
					}
				} else {
					patch.push({
						op: 'put',
						key: `message/${row.id}`,
						value: {
							from: row.sender,
							content: row.content,
							order: parseInt(row.ord),
						},
					});
				}
			}

			return json({
				lastMutationID,
				cookie: version,
				patch,
			});
		});
	} catch (e: any) {
		console.error(e);
		return new Response(e.toString(), {
			status: 500,
		});
	} finally {
		console.log('Processed pull in', Date.now() - t0);
	}
	return new Response(null, { status: 500 });
};
