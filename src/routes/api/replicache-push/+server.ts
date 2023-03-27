/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultSpaceID, processMutation, sendPoke, tx } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';
import type { PushRequest } from 'replicache';

export const POST: RequestHandler = async (event) => {
	const push = (await event.request.json()) as PushRequest;
	// console.log('Processing push', JSON.stringify(push));

	const t0 = Date.now();
	try {
		// Iterate each mutation in the push.
		for (const mutation of push.mutations) {
			const t1 = Date.now();

			try {
				await tx((t) =>
					processMutation(t, push.clientID, defaultSpaceID, mutation),
				);
			} catch (e: any) {
				console.error('Caught error for mutation', mutation, e);
				// Handle errors inside mutations by skipping and moving on. This is
				// convenient in development but you may want to reconsider as your app
				// gets close to production:
				//
				// https://doc.replicache.dev/server-push#error-handling
				//
				// Ideally we would run the mutator itself in a nested transaction, and
				// if that fails, rollback just the mutator and allow the limit and
				// version updates to commit. However, nested transaction support in
				// Postgres is not great:
				//
				// https://postgres.ai/blog/20210831-postgresql-subtransactions-considered-harmful
				//
				// Instead we implement skipping of failed mutations by *re-running*
				// them, but passing a flag that causes the mutator logic to be skipped.
				//
				// This ensures that the limit and version bookkeeping works exactly the
				// same way as in the happy path. A way to look at this is that for the
				// error-case we replay the mutation but it just does something
				// different the second time.
				//
				// This is allowed in Replicache because mutators don't have to be
				// deterministic!:
				//
				// https://doc.replicache.dev/concepts/how-it-works#speculative-execution-and-confirmation
				await tx((t) =>
					processMutation(t, push.clientID, defaultSpaceID, mutation, e),
				);
			}

			await sendPoke();
		}
	} catch (e: any) {
		console.error(e);
		return new Response(e.toString(), {
			status: 500,
		});
	} finally {
		console.log(`Processed push in:${Date.now() - t0}`);
	}
	return new Response('ok');
};
