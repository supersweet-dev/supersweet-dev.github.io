export function GET(request: Request) {
	return new Response(`${request.method} request received`);
}

export async function POST(request: Request) {
	const body = await request.json();
	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/json' },
	});
}
