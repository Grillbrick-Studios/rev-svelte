import { REPLICHAT_DB_CONNECTION_STRING, REPLICHAT_PUSHER_APP_ID, REPLICHAT_PUSHER_SECRET } from '$env/static/private';
import { PUBLIC_REPLICHAT_PUSHER_CLUSTER, PUBLIC_REPLICHAT_PUSHER_KEY } from '$env/static/public';
import pgInit, { type ITask } from 'pg-promise';
import Pusher from 'pusher';
import type { Mutation } from 'replicache';

const pgp = pgInit();
export const db = pgp(REPLICHAT_DB_CONNECTION_STRING);

export const defaultSpaceID = 'default';

const { isolationLevel } = pgp.txMode;
const SerializableMode = new pgp.txMode.TransactionMode({
	tiLevel: isolationLevel.serializable,
});

// Helper to make sure we always access database at serializable level.
export async function tx<T>(f: (t: pgInit.ITask<unknown>) => T) {
	return await db.tx(
		{
			mode: SerializableMode,
		},
		f,
	);
}

export async function processMutation(
	t: ITask<unknown>,
	clientID: string,
	spaceID: string,
	mutation: Mutation,
	error?: Error,
) {
	// Get the previous version for the affected space and calculate the next
	// one.
	const { version: prevVersion } = await t.one(
		'select version from space where key = $1 for update',
		spaceID,
	);
	const nextVersion = prevVersion + 1;

	const lastMutationID = await getLastMutationID(t, clientID, false);
	const nextMutationID = lastMutationID + 1;

	// console.log('nextVersion', nextVersion, 'nextMutationID', nextMutationID);

	// It's common due to connectivity issues for clients to send a
	// mutation which has already been processed. Skip these.
	if (mutation.id < nextMutationID) {
		console.log(
			`Mutation ${mutation.id} has already been processed - skipping`,
		);
		return;
	}

	// If the Replicache client is working correctly, this can never
	// happen. If it does there is nothing to do but return an error to
	// client and report a bug to Replicache.
	if (mutation.id > nextMutationID) {
		throw new Error(`Mutation ${mutation.id} is from the future - aborting`);
	}

	if (error === undefined) {
		// console.log('Processing mutation:', JSON.stringify(mutation));

		// For each possible mutation, run the server-side logic to apply the
		// mutation.
		switch (mutation.name) {
			case 'createMessage':
				await createMessage(t, mutation.args as Message, spaceID, nextVersion);
				break;
			default:
				throw new Error(`Unknown mutation: ${mutation.name}`);
		}
	} else {
		// TODO: You can store state here in the database to return to clients to
		// provide additional info about errors.
		console.log(
			'Handling error from mutation',
			JSON.stringify(mutation),
			error,
		);
	}

	// console.log('setting', clientID, 'last_mutation_id to', nextMutationID);
	// Update lastMutationID for requesting client.
	await setLastMutationID(t, clientID, nextMutationID);

	// Update version for space.
	await t.none('update space set version = $1 where key = $2', [
		nextVersion,
		spaceID,
	]);
}

export async function getLastMutationID(
	t: ITask<unknown>,
	clientID: string,
	required: boolean,
) {
	const clientRow = await t.oneOrNone(
		`select last_mutation_id from replicache_client where id = $1`,
		clientID,
	);
	if (!clientRow) {
		// If the client is unknown ensure the request is from a new client. If it
		// isn't, data has been deleted from the server, which isn't supported:
		// https://github.com/rocicorp/replicache/issues/1033.
		if (required) {
			throw new Error(`client not found: ${clientID}`);
		}
		return 0;
	}
	return parseInt(clientRow.last_mutation_id);
}

export async function setLastMutationID(
	t: ITask<unknown>,
	clientID: string,
	mutationID: number,
) {
	const result = await t.result(
		'update replicache_client set last_mutation_id = $2 where id = $1',
		[clientID, mutationID],
	);
	if (result.rowCount === 0) {
		await t.none(
			'insert into replicache_client (id, last_mutation_id) values ($1, $2)',
			[clientID, mutationID],
		);
	}
}

export async function createMessage(
	t: ITask<unknown>,
	{ id, from, content, order }: Message,
	spaceID: string,
	version: any,
) {
	await t.none(
		`insert into message (
    id, space_id, sender, content, ord, deleted, version) values
    ($1, $2, $3, $4, $5, false, $6)`,
		[id, spaceID, from, content, order, version],
	);
}

export async function sendPoke() {
	const pusher = new Pusher({
		appId: REPLICHAT_PUSHER_APP_ID,
		key: PUBLIC_REPLICHAT_PUSHER_KEY,
		secret: REPLICHAT_PUSHER_SECRET,
		cluster: PUBLIC_REPLICHAT_PUSHER_CLUSTER,
		useTLS: true,
	});
	const t0 = Date.now();
	await pusher.trigger('default', 'poke', {});
	console.log('Sent poke in', Date.now() - t0)
}