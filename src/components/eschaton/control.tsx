import React, { useEffect, useState } from 'react';
import type { ScreenItem } from '../../types/eschaton';

interface ControlProps {
	data: ScreenItem;
}

const Control: React.FC<ControlProps> = ({ data }) => {
	if (data.type !== 'control') return <></>;
	return (
		<div className="control">
			<h3>{data.header}</h3>
			<p>{data.content}</p>
		</div>
	);
};

export default Control;
