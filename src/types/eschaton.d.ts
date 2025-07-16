export type Screen = {
	name: string;
	structure: ScreenItem[];
};
type ScreenId = 'landing' | 'charriot' | 'start' | 'gm' | 'hermit' | 'magician';

export type SelectOption = {
	label: string;
	value: string;
};

export type StatBlock = {
	body: number;
	mind: number;
	soul: number;
};

export type Move = {
	name: string;
	description: string;
};

export type Trait = {
	label: string;
	value: string;
	description: string;
	move: Move;
};

export type ScreenItem =
	| {
			type: 'control';
			header: string;
			content: string;
	  }
	| {
			type: 'navigation';
			target: ScreenId;
			label: string;
	  }
	| {
			type: 'select';
			label: string;
			options: SelectOption[];
	  }
	| {
			type: 'characterprofile';
			role: string;
			header: string;
			content: string;
			image: string;
			stats: StatBlock;
			hp: number;
			placeholdernames: string[];
			pronouns: string;
			placeholderdescription: string;
	  }
	| {
			type: 'origin';
			options: Trait[];
	  }
	| {
			type: 'background';
			options: Trait[];
	  }
	| {
			type: 'movelist';
			moves: Move[];
	  };
