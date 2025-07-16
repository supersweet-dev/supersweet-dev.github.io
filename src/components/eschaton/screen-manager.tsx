import React, { useEffect, useState } from 'react';
import type { Screen, ScreenId } from '../../types/eschaton';
import Control from './control';
import Move from './move';
import Navigation from './navigation';
import Select from './select';
import CharacterProfile from './character-profile';

interface ScreenManagerProps {
	screen: Screen | null;
	setScreenId?: (id: ScreenId) => void;
}

const ScreenManager: React.FC<ScreenManagerProps> = ({
	screen,
	setScreenId,
}) => {
	if (!screen) return <div>Loading...</div>;
	return (
		<div className={screen.name}>
			{
				//for every item in screen.structure
				screen.structure.map((item, index) => {
					if (item.type === 'characterprofile') {
						return <CharacterProfile key={index} data={item} />;
					}
					if (item.type === 'control') {
						return <Control key={index} data={item} />;
					}
					if (item.type === 'navigation' && setScreenId) {
						return (
							<Navigation
								key={index}
								data={item}
								setScreenId={setScreenId}
							/>
						);
					}
					return <></>;
				})
			}
		</div>
	);
};

export default ScreenManager;
