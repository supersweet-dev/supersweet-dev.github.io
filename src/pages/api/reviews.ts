import type { APIRoute } from 'astro';
import { parseStringPromise } from 'xml2js';

const LETTERBOXD_RSS_URL = 'https://letterboxd.com/pentagrami/rss';
const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

export const GET: APIRoute = async () => {
	try {
		const res = await fetch(LETTERBOXD_RSS_URL);
		const xml = await res.text();

		const parsed = await parseStringPromise(xml, { explicitArray: false });
		const items = parsed.rss.channel.item;

		// Limit to most recent 10
		const recent = Array.isArray(items) ? items.slice(0, 10) : [items];

		const reviews = await Promise.all(
			recent.map(async (item: any) => {
				const tmdbId = item['tmdb:movieId'];
				const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`;
				const details = await fetch(movieDetailsUrl, {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${TMDB_API_KEY}`,
					},
				});
				if (!details.ok) {
					console.error(
						`TMDb request failed for ID ${tmdbId}`,
						details.status
					);
					return {
						data: item,
						title: item.title,
						year: item.pubDate,
						poster: null,
						error: true,
					};
				}
				const posterPath = (await details.json())['poster_path'];
				const posterUrl = `${TMDB_IMAGE_BASE_URL}${posterPath}`;
				return {
					data: item,
					title: item['letterboxd:filmTitle'],
					year: item['letterboxd:filmYear'],
					watchedAt: item['letterboxd:watchedDate'] ?? item.pubDate,
					score: item['letterboxd:memberRating'],
					poster: posterPath ? posterUrl : null,
					link: item.link,
				};
			})
		);

		return new Response(JSON.stringify(reviews), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error('Error fetching or parsing RSS:', err);
		return new Response('Failed to fetch RSS', { status: 500 });
	}
};
