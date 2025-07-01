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
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl.toString());
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: Review[] = await response.json();
				setItems(data.filter((item) => !item.error));
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

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === items.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? items.length - 1 : prevIndex - 1
		);
	};

	if (loading)
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
				<p>Loading reviews...</p>
			</div>
		);

	if (error)
		return (
			<div className="error-container">
				<div className="error-icon">⚠️</div>
				<p>Error: {error}</p>
			</div>
		);

	return (
		<div className="carousel-container">
			<h2 className="carousel-title">Recent Movie Reviews</h2>

			<div className="carousel">
				<button
					className="nav-button prev"
					onClick={prevSlide}
					aria-label="Previous review"
				>
					‹
				</button>

				<div className="carousel-track">
					{items.map(
						(item, index) =>
							!item.error && (
								<div
									className={`carousel-card ${
										index === currentIndex ? 'active' : ''
									}`}
									key={index}
									style={{
										transform: `translateX(-${
											currentIndex * 100
										}%)`,
									}}
								>
									<a
										href={item.link}
										className="review-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="poster-container">
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
										</div>
										<div className="review-details">
											<h3>
												{item.title}{' '}
												<span className="year">
													({item.year})
												</span>
											</h3>
											<div className="score-container">
												<span className="score-label">
													Rating:
												</span>
												<span className="score-value">
													★ {item.score}
												</span>
											</div>
											<div className="watched-container">
												<span className="watched-label">
													Watched:
												</span>
												<span className="watched-value">
													{item.watchedAt}
												</span>
											</div>
										</div>
									</a>
								</div>
							)
					)}
				</div>

				<button
					className="nav-button next"
					onClick={nextSlide}
					aria-label="Next review"
				>
					›
				</button>
			</div>

			<div className="carousel-dots">
				{items.map((_, index) => (
					<button
						key={index}
						className={`dot ${
							index === currentIndex ? 'active' : ''
						}`}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Go to review ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ReviewShowcase;
