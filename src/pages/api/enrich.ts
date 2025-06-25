import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ params, request }: any) => {
	return new Response(
		JSON.stringify({
			message: 'This was a GET!',
		})
	);
};

export const POST: APIRoute = ({ request }: any) => {
	return new Response(
		JSON.stringify({
			message: 'This was a POST!',
		})
	);
};

export const DELETE: APIRoute = ({ request }: any) => {
	return new Response(
		JSON.stringify({
			message: 'This was a DELETE!',
		})
	);
};

// ALL matches any method that you haven't implemented.
export const ALL: APIRoute = ({ request }: any) => {
	return new Response(
		JSON.stringify({
			message: `This was a ${request.method}!`,
		})
	);
};
