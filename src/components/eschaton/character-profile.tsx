import React from 'react';
import type { ScreenItem } from '../../types/eschaton';

interface CharacterProfileProps {
	data: ScreenItem;
}

const CharacterProfile: React.FC<CharacterProfileProps> = ({ data }) => {
	if (data.type !== 'characterprofile') return <></>;

	const {
		role,
		header,
		content,
		image,
		stats,
		hp,
		placeholdernames,
		pronouns,
		placeholderdescription,
	} = data;

	const randomNameIndex = Math.floor(Math.random() * placeholdernames.length);
	const randomName = placeholdernames[randomNameIndex];
	const hpArray = Array.from({ length: hp }, (_, i) => i + 1);
	const renderStatIcon = (type: 'body' | 'mind' | 'soul') => {
		const value = stats[type];
		const symbol = type === 'body' ? '■' : type === 'mind' ? '▲' : '●';

		return (
			<div className="stat">
				<span className="symbol">{symbol}</span>
				<span className="label">{type}</span>
				<span className="value">
					{value >= 0 ? `+${value}` : value}
				</span>
			</div>
		);
	};

	return (
		<div className="character-profile">
			<h2>{header}</h2>

			<img
				src={`/assets/eschaton/images/${image}`}
				alt={`${header} illustration`}
				className="character-image"
			/>
			<p className="description">{content}</p>
			<div className="inputs-section">
				<div className="identity-section">
					<label>
						Name:
						<input type="text" placeholder={randomName} />
					</label>
					<label>
						Pronouns:
						<input type="text" placeholder={pronouns} />
					</label>
				</div>
				<label>
					Description:
					<textarea placeholder={placeholderdescription} rows={3} />
				</label>
			</div>
			<div className="hp-section">
				<span className="hp-label">HP:</span>
				<div className="hp-checklist">
					{hpArray.map((_, i) => (
						<input key={_ + i} type="checkbox" defaultChecked />
					))}
				</div>
			</div>
			<div className="stats-section">
				{renderStatIcon('body')}
				{renderStatIcon('mind')}
				{renderStatIcon('soul')}
			</div>
		</div>
	);
};

export default CharacterProfile;
