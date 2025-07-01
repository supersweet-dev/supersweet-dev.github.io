export type Review =
	| {
			error: false;
			title: string;
			year: string;
			watchedAt: string;
			score: string;
			poster: string | null;
			link: string;
	  }
	| {
			error: true;
			status?: number;
	  };

export type RSSItem = {
	'tmdb:movieId': string;
	'letterboxd:filmTitle': string;
	'letterboxd:filmYear': string;
	'letterboxd:watchedDate'?: string;
	'letterboxd:memberRating': string;
	link: string;
	pubDate: string;
};
