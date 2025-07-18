import Move from './move';
import type { PlayMove } from '../../types/eschaton';
import React from 'react';
interface MoveListProps {
	moves: PlayMove[];
}
const MoveList: React.FC<MoveListProps> = ({ moves }) => {
	if (moves.length === 0) return <p>No moves available.</p>;

	return (
		<div className="move-list">
			{moves.map((move, index) => (
				<Move key={index} data={move} />
			))}
		</div>
	);
};
export default MoveList;
