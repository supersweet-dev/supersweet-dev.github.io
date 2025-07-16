import React, { useEffect, useState } from 'react';
import type { ScreenItem } from '../../types/eschaton';

interface CharacterProfileProps {
	data: ScreenItem;
}

const CharacterProfile: React.FC<CharacterProfileProps> = ({ data }) => {
	if (data.type === 'characterprofile')
		return (
			<div className="character-profile">
				<h1>This is a character sheet</h1>
				<h3>{data.header}</h3>
				<p>{data.content}</p>
			</div>
		);
	else return <></>;
};

export default CharacterProfile;
