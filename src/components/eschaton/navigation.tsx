import React, { useEffect, useState } from 'react';
import type { ScreenId, ScreenItem } from '../../types/eschaton';

interface NavigationProps {
	data: ScreenItem;
	setScreenId: (screenId: ScreenId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ data, setScreenId }) => {
	if (data.type !== 'navigation') return <></>;
	return (
		<div className="navigation">
			<a onClick={() => setScreenId(data.target)}>
				<h4>{data.label}</h4>
			</a>
		</div>
	);
};

export default Navigation;
