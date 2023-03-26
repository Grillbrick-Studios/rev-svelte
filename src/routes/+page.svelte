<script lang="ts">
	import { browser } from '$app/environment';
	import { Replicache } from 'replicache';
	import type { Message } from './api/replicache-pull/+server';

	const rep = browser
		? new Replicache({
				name: 'chat-user-id',
				licenseKey: 'l937417d281654551a7bb39d0dbc48ebe',
				pushURL: '/api/replicache-push',
				pullURL: '/api/replicache-pull',
		  })
		: null;
	let messages: { [key: string]: Message } = {};

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
					for (const [key, value] of result) {
						messages[key] = value;
					}
				},
			},
		);
	}

	function onSubmit() {
		// TODO: Create message
	}

	function listen(rep: Replicache) {
		// TODO: listen for changes on server
	}
</script>

<div class="container">
	<form on:submit|preventDefault={() => onSubmit()} class="form">
		<input type="text" class="username" required />
		<input type="text" class="content" required />
		<input type="submit" />
	</form>
	{#each Object.entries(messages) as [k, v] (k)}
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
