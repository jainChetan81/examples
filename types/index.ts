export type Characters = {
	id: number;
	name: string;
	status: string;
	species: string;
	gender: string;
	origin: CharacterOrigin;
	image: string;
	episode: string[];
	location: CharacterOrigin;
	url: string;
};
export type CharacterOrigin = {
	name: string;
	url: string;
};
export type LayoutType = {
	title: string;
	keywords?: string;
	description?: string;
	children: any;
};
