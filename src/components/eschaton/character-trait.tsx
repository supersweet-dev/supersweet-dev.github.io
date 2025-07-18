import React, { useState } from 'react';
import Move from './move';
import type { ScreenItem } from '../../types/eschaton';

interface CharacterTraitProps {
	data: ScreenItem;
}

const CharacterTrait: React.FC<CharacterTraitProps> = ({ data }) => {
	if (!(data.type == 'origin' || data.type == 'background')) return <></>;

	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const selected =
		data.options.find((o) => o.value === selectedValue) || null;

	return (
		<div className="character-trait">
			<div className="select-wrapper">
				<label htmlFor="trait-select" className="trait-label">
					Choose your {data.type}:
				</label>

				<select
					id="trait-select"
					className="trait-select"
					value={selectedValue || ''}
					onChange={(e) => setSelectedValue(e.target.value || null)}
				>
					<option value="">-- Select {data.type} --</option>
					{data.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>

			{selected && (
				<div className="trait-details">
					<p className="trait-description">{selected.description}</p>
					<p className="trait-description">
						Your {data.type} grants you the following move:
					</p>
					<div className="trait-move">
						<Move data={selected.move} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CharacterTrait;
