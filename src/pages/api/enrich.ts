import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ params, request }: any) => {
	return new Response(
		JSON.stringify({
			message: 'This route does not support GET requests.',
		})
	);
};

export const POST: APIRoute = async ({ request }: any) => {
	const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
	console.log('TMDB_API_KEY:', TMDB_API_KEY);
	const reviews = await request.json();

	const enriched = await Promise.all(
		reviews.map(async (r: any) => {
			const res = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
					r.title
				)}&year=${r.year}`
			);
			const json = await res.json();
			return {
				...r,
				tmdb: json,
			};
		})
	);

	return new Response(JSON.stringify(enriched), {
		headers: { 'Content-Type': 'application/json' },
	});
};
