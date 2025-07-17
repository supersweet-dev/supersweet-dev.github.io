//server-driven UI demo, building a tabletop RPG wizard (character creation, rule reference) from json files.
import React, { useEffect, useState } from 'react';
import type { Screen, ScreenId } from '../types/eschaton';
import ScreenManager from './eschaton/screen-manager';

const EschatonMiniWizard = () => {
	const [screenId, setScreenId] = useState<ScreenId>('landing');
	const [screen, setScreen] = useState<Screen | null>(null);
	const screens: Record<ScreenId, string> = {
		landing: '/assets/eschaton/sheets/landing.json',
		charriot: '/assets/eschaton/sheets/charriot.json',
		magician: '/assets/eschaton/sheets/magician.json',
		hermit: '/assets/eschaton/sheets/hermit.json',
		start: '/assets/eschaton/sheets/start.json',
		gm: '/assets/eschaton/sheets/gm.json',
	};
	const fetchScreen = async () => {
		const response = await fetch(screens[screenId]);
		const data: Screen = await response.json();
		setScreen(data);
	};
	useEffect(() => {
		fetchScreen();
	}, [screenId]);

	return (
		<body className={`eschaton-mini ${screenId}`}>
			<div className="eschaton-header">e•mini</div>
			<div className="eschaton-content">
				<ScreenManager screen={screen} setScreenId={setScreenId} />
			</div>
			<footer className="eschaton-footer">© 2025 Gema Alvarez</footer>
		</body>
	);
};

export default EschatonMiniWizard;
