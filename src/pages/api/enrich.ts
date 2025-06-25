// src/pages/api/enrich.ts
export const POST = async ({ request }: any) => {
	const data = await request.json();

	return new Response(
		JSON.stringify({
			received: data,
			message: 'POST handler is working!',
		}),
		{
			headers: { 'Content-Type': 'application/json' },
			status: 200,
		}
	);
};

// Optional GET for browser test
export const GET = () =>
	new Response('This endpoint only supports POST requests.', {
		status: 405,
		headers: { 'Content-Type': 'text/plain' },
	});
