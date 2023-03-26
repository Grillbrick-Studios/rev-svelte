import { json, type RequestHandler } from '@sveltejs/kit';

export type Message = {
	from: string;
	content: string;
	order: number;
};

export const POST: RequestHandler = async (_event) => {
	return json({
		lastMutationID: 0,
		cookie: null,
		patch: [
			{ op: 'clear' },
			{
				op: 'put',
				key: 'message/qpdgkvpd9ao',
				value: {
					from: 'Jane',
					content: "Hey, what's for lunch?",
					order: 1,
				},
			},
			{
				op: 'put',
				key: 'message/5alcaic408',
				value: {
					from: 'fred',
					content: 'tacos?',
					order: 2,
				},
			},
		],
	});
};
