// React component to showcase reviews
import type { Review } from '../types';
import React, { useState, useEffect } from 'react';

// Define props (optional `apiUrl` with a default value)
interface ReviewShowcaseProps {
	apiUrl?: string | URL;
}

const ReviewShowcase: React.FC<ReviewShowcaseProps> = ({
	apiUrl = '/api/list',
}) => {
	const [items, setItems] = useState<Review[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl);
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
	}, [apiUrl]); // Re-fetches if `apiUrl` changes

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<ul>
			{items.map(
				(item, index) =>
					!item.error && <li key={index}>{item.title}</li>
			)}
		</ul>
	);
};

export default ReviewShowcase;
