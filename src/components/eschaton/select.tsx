import React, { useState } from 'react';
import type { ScreenId, ScreenItem } from '../../types/eschaton';

interface SelectProps {
	data: ScreenItem;
	setScreenId: (screenId: ScreenId) => void;
}

const Select: React.FC<SelectProps> = ({ data, setScreenId }) => {
	if (data.type !== 'select') return <></>;

	const [selected, setSelected] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSelected(value);
		setScreenId(value as ScreenId);
	};

	return (
		<div>
			<label htmlFor={data.label}>{data.label}</label>
			<select name={data.label} value={selected} onChange={handleChange}>
				<option value="" disabled>
					-- Select an option --
				</option>
				{data.options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
