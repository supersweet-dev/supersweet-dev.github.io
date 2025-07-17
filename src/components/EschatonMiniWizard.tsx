//server-driven UI demo, building a tabletop RPG wizard (character creation, rule reference) from json files.
import React, { useEffect, useState } from 'react';
import type { Screen, ScreenId } from '../types/eschaton';
import ScreenManager from './eschaton/screen-manager';

const EschatonMiniWizard = () => {
	const [screenId, setScreenId] = useState<ScreenId>('chariot'); //Chariot for testing, 'landing' SHOULD BE DEFAULT
	const [screen, setScreen] = useState<Screen | null>(null);
	const screens: Record<ScreenId, string> = {
		landing: '/assets/eschaton/sheets/landing.json',
		chariot: '/assets/eschaton/sheets/chariot.json',
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
		const body = document.body;
		body.className = `eschaton-mini ${screenId}`;
		window.scrollTo({ top: 0, behavior: 'instant' });
	}, [screenId]);

	return (
		<div className={`eschaton-wrapper`}>
			<div
				className="eschaton-header"
				onClick={() => setScreenId('landing')}
			>
				e•mini
			</div>
			<div className="eschaton-content">
				<div className="eschaton-screen">
					<ScreenManager screen={screen} setScreenId={setScreenId} />
				</div>
				<footer className="eschaton-footer">© 2025 Gema Alvarez</footer>
			</div>
		</div>
	);
};

export default EschatonMiniWizard;
