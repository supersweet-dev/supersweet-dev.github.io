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
	if (!TMDB_API_KEY) {
		console.error('TMDB_BEARER not defined in env vars');
		return new Response('Server misconfiguration.', { status: 500 });
	}

	const reviews = await request.json();

	const enriched = await Promise.all(
		reviews.map(async (r: { title: string; year: string }) => {
			const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
				r.title
			)}&include_adult=true&language=en-US&primary_release_year=${
				r.year
			}&page=1`;

			const res = await fetch(url, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${TMDB_API_KEY}`,
				},
			});

			if (!res.ok) {
				console.error(`TMDb request failed for ${r.title}`, res.status);
				return { ...r, poster: null, error: true };
			}

			const json = await res.json();
			const posterPath = json?.results?.[0]?.poster_path || null;
			const posterUrl = posterPath
				? `https://image.tmdb.org/t/p/w342${posterPath}`
				: null;

			return {
				...r,
				poster: posterUrl,
			};
		})
	);

	return new Response(JSON.stringify(enriched), {
		headers: { 'Content-Type': 'application/json' },
	});
};
