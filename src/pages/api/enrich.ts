export const GET = () =>
	new Response('This endpoint only supports POST requests.', {
		status: 405,
	});
export const POST = async ({ request }: { request: Request }) => {
	const TMDB_API_KEY: string = import.meta.env.TMDB_API_KEY as string;
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
				poster: json?.results?.[0]?.poster_path
					? `https://image.tmdb.org/t/p/w342${json.results[0].poster_path}`
					: null,
			};
		})
	);

	console.log('Enriched reviews:', enriched);

	return new Response(JSON.stringify(enriched), {
		headers: { 'Content-Type': 'application/json' },
	});
};
