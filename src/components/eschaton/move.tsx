import React, { useEffect, useState } from 'react';
import type { PlayMove } from '../../types/eschaton';
import ReactMarkdown from 'react-markdown';

interface MoveProps {
	data: PlayMove;
}

const Move: React.FC<MoveProps> = ({ data }) => {
	return (
		<div className="move-details">
			<h3 className="move-name">{data.name}</h3>
			<ReactMarkdown>{data.description}</ReactMarkdown>
		</div>
	);
};
export default Move;
