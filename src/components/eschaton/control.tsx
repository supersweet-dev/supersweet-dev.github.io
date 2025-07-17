import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ScreenItem } from '../../types/eschaton';

interface ControlProps {
	data: ScreenItem;
}

const Control: React.FC<ControlProps> = ({ data }) => {
	if (data.type !== 'control') return <></>;
	return (
		<div className="control">
			<p className="control-title">{data.header}</p>
			<ReactMarkdown>{data.content}</ReactMarkdown>
		</div>
	);
};

export default Control;
