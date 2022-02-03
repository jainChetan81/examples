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
export type Planet = {
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	residents: string[];
	films: string[];
	url: string;
};
export type Planets = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[];
};
export type Person = {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[];
	vehicles: string[];
	starships: string[];
	url: string;
};
export type People = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Person[];
};
