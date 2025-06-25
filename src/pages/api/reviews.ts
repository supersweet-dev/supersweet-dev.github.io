import type { APIRoute } from 'astro';
import { parseStringPromise } from 'xml2js';

const LETTERBOXD_RSS_URL = 'https://letterboxd.com/pentagrami/rss';

export const GET: APIRoute = async () => {
	try {
		const res = await fetch(LETTERBOXD_RSS_URL);
		const xml = await res.text();

		const parsed = await parseStringPromise(xml, { explicitArray: false });
		const items = parsed.rss.channel.item;

		// Limit to most recent 10
		const recent = Array.isArray(items) ? items.slice(0, 10) : [items];

		const reviews = recent;

		return new Response(JSON.stringify(reviews), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error('Error fetching or parsing RSS:', err);
		return new Response('Failed to fetch RSS', { status: 500 });
	}
};
