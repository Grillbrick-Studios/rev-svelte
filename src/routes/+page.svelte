<script lang="ts">
	import { browser } from '$app/environment';
	import {
		PUBLIC_REPLICHAT_PUSHER_CLUSTER,
		PUBLIC_REPLICHAT_PUSHER_KEY,
	} from '$env/static/public';
	import { nanoid } from 'nanoid';
	import Pusher from 'pusher-js';
	import { Replicache, type WriteTransaction } from 'replicache';

	const rep = browser
		? new Replicache({
				name: 'chat-user-id',
				licenseKey: 'l937417d281654551a7bb39d0dbc48ebe',
				pushURL: '/api/replicache-push',
				pullURL: '/api/replicache-pull',
				mutators: {
					async createMessage(
						tx: WriteTransaction,
						{ id, from, content, order }: Message,
					) {
						await tx.put(`message/${id}`, {
							from,
							content,
							order,
						});
					},
				},
		  })
		: null;
	let messages: [string, Message][] = [];

	if (rep) {
		listen(rep);
		rep.subscribe(
			async (tx) => {
				const list = (await tx
					.scan({ prefix: 'message/' })
					.entries()
					.toArray()) as (readonly [string, Message])[];
				list.sort(([, { order: a }], [, { order: b }]) => a - b);
				return list;
			},
			{
				onData(result) {
					messages = [];
					for (const [key, value] of result) {
						messages.push([key, value]);
					}
				},
			},
		);
	}

	let usernameRef: HTMLInputElement;
	let contentRef: HTMLInputElement;

	function onSubmit() {
		const last =
			messages.length > 0 ? messages[messages.length - 1][1] : undefined;
		const order = (last?.order ?? 0) + 1;
		rep?.mutate.createMessage({
			id: nanoid(),
			from: usernameRef.value,
			content: contentRef.value,
			order,
		});
		contentRef.value = '';
	}

	function listen(rep: Replicache) {
		console.log('listening');
		// Listen for pokes, and pull whenever we get one.
		Pusher.logToConsole = true;
		const pusher = new Pusher(PUBLIC_REPLICHAT_PUSHER_KEY, {
			cluster: PUBLIC_REPLICHAT_PUSHER_CLUSTER,
		});
		const channel = pusher.subscribe('default');
		channel.bind('poke', () => {
			console.log('got poked');
			rep.pull();
		});
	}
</script>

<div class="container">
	<form on:submit|preventDefault={() => onSubmit()} class="form">
		<input type="text" class="username" bind:this={usernameRef} required />
		<input type="text" class="content" bind:this={contentRef} required />
		<input type="submit" />
	</form>
	{#each messages as [k, v] (k)}
		<div>
			<b>{v.from}: </b>
			{v.content}
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.form {
		display: flex;
		flex-direction: row;
		flex: 0;
		margin-bottom: 1em;
	}

	.username {
		flex: 0;
		margin-right: 1em;
	}

	.content {
		flex: 1;
		max-width: 30em;
		margin: 0 1em;
	}
</style>
