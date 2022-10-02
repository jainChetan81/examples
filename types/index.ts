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

// * FORMS TYPES IN FORMS PAGE

export type FORM_TEMPLATE_TYPE = {
	formTemplateID: string; //uuid
	formTitle: string;
	formDescription: string;
	defaultPointValue: number | null; //if the form is a quiz the default point for each question is this value
	isQuizMode: 0 | 1; //0-false
	formSections: FORM_SECTION_TYPE[];
	createdTs: number;
	formScore: FORM_SCORE_TYPE[];
	lastModifiedTs: number;
};
export type FORMS_FILTER_COLUMNS = "formTitle" | "createdTs" | "lastModifiedTs";
export type PARTIAL_FORM_TEMPLATE = Pick<
	FORM_TEMPLATE_TYPE,
	"formTemplateID" | "formTitle" | "formDescription" | "lastModifiedTs" | "createdTs"
>;
export type FORM_SECTION_TYPE = {
	formSectionID: string; //uuid
	sectionTitle: string;
	sectionDescription: string | null;
	formQuestions: FORM_QUESTION_TYPE[];
	createdTs: number;
	lastModifiedTs: number;
	seqNumber: number;
	nextSection: string;
};

export type FORM_SCORE_TYPE = {
	low: number | null;
	high: number | null;
	result: string | null;
	scoreID: string | null; //uuid
};
export type QUESTION_TYPES = "varchar" | "mChoice" | "cb" | "dd" | "int" | "file" | "date" | "address" | "photo";
export type FORM_QUESTION_TYPE = {
	questionID: string; //uuid
	createdTs: number;
	lastModifiedTs: number;
	options: FORM_OPTIONS_TYPE[];
	question: string;
	questionType: QUESTION_TYPES;
	required: boolean;
	score: number | null;
	sequence: number;
	jumpToSectionBasedOnAnswer?: boolean;
};
export type FORM_OPTIONS_TYPE = {
	correct: null | boolean;
	optionValue: string;
	createdTs: number;
	lastModifiedTs: number;
	nextSection: string | null;
};
