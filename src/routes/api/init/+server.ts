import { tx } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	await tx(async (t) => {
		await t.none('drop table if exists roles');
		await t.none('drop table if exists account_roles');

		// First we create a table to hold roles like admins to give special
		// permissions.
		await t.none(`create table if not exists roles (
			role_id serial primary key,
			role_name varchar(255) unique not null)`);

		await t.none(`alter table roles
			enable row level security
		`)

		// Now we add the default user and admin roles.

		// Next we create the account_roles table that pairs the roles with user accounts
		await t.none(`create table if not exists account_roles (
			user_id uuid not null,
			role_id int not null,
			grant_date TIMESTAMP DEFAULT now(),
			PRIMARY KEY (user_id, role_id),
			FOREIGN KEY (role_id)
				REFERENCES roles (role_id),
			FOREIGN KEY (user_id)
				REFERENCES auth.users (id))`);

		await t.none(`alter table account_roles
			enable row level security
		`)
	});
	return new Response('ok');
};
