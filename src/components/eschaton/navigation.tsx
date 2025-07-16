import React, { useEffect, useState } from 'react';
import type { ScreenId, ScreenItem } from '../../types/eschaton';

interface NavigationProps {
	data: ScreenItem;
	setScreenId: (screenId: ScreenId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ data, setScreenId }) => {
	if (data.type !== 'navigation') return <></>;
	return (
		<button className="navigation" onClick={() => setScreenId(data.target)}>
			{data.label}
		</button>
	);
};

export default Navigation;
