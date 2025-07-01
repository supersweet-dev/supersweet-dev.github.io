import type { APIRoute } from 'astro';
import { parseStringPromise } from 'xml2js';
import type { Review, RSSItem } from '../../types/index.d.ts';

const LETTERBOXD_RSS_URL = 'https://letterboxd.com/pentagrami/rss';
const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

export const GET: APIRoute = async () => {
	if (!TMDB_API_KEY) {
		return new Response('TMDB API key not configured', { status: 500 });
	}
	try {
		const res = await fetch(LETTERBOXD_RSS_URL);
		const xml = await res.text();

		const parsed = await parseStringPromise(xml, { explicitArray: false });
		const items = parsed.rss.channel.item;

		const recent = Array.isArray(items) ? items.slice(0, 10) : [items];

		const reviews = (await Promise.all(
			recent.map(async (item: RSSItem) => {
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
						status: details.status,
						error: true,
					} as Review;
				}
				const posterPath = (await details.json())['poster_path'];
				const posterUrl = `${TMDB_IMAGE_BASE_URL}${posterPath}`;
				return {
					error: false,
					title: item['letterboxd:filmTitle'],
					year: item['letterboxd:filmYear'],
					watchedAt: item['letterboxd:watchedDate'] ?? item.pubDate,
					score: item['letterboxd:memberRating'],
					poster: posterPath ? posterUrl : null,
					link: item.link,
				} as Review;
			})
		)) as Review[];

		return new Response(JSON.stringify(reviews), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		return new Response('Failed to fetch RSS', { status: 500 });
	}
};
