import type { Review } from '../types';
import React, { useState, useEffect } from 'react';
import '../styles/review-showcase.css';

interface ReviewShowcaseProps {
	apiUrl?: string | URL;
}

const ReviewShowcase: React.FC<ReviewShowcaseProps> = ({ apiUrl = '' }) => {
	const [items, setItems] = useState<Review[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl.toString());
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: Review[] = await response.json();
				setItems(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'An unknown error occurred'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [apiUrl]);

	if (loading) return <div>Loading reviews...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="review-grid">
			{items.map(
				(item, index) =>
					!item.error && (
						<a
							href={item.link}
							key={index}
							className="review-card"
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.poster ? (
								<img
									src={item.poster}
									alt={`Poster for ${item.title}`}
									className="review-poster"
								/>
							) : (
								<div className="poster-placeholder">
									No Poster
								</div>
							)}
							<div className="review-details">
								<h3>
									{item.title} ({item.year})
								</h3>
								<p>★ {item.score}</p>
								<p className="watched">
									Watched: {item.watchedAt}
								</p>
							</div>
						</a>
					)
			)}
		</div>
	);
};

export default ReviewShowcase;
