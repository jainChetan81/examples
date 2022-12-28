import { Form, FormOption, FormQuestion, FormScore, FormSection, QuestionType } from "@prisma/client";
import { z } from "zod";

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

export type FORM_TEMPLATE_TYPE = Form & {
	formSections: FORM_SECTION_TYPE[];
	formScore: FORM_SCORE_TYPE[];
};
export type FORM_SECTION_TYPE = FormSection & {
	formQuestions: FORM_QUESTION_TYPE[];
};

export type FORM_SCORE_TYPE = FormScore;
export type QUESTION_TYPES = QuestionType;
export type FORM_QUESTION_TYPE = FormQuestion & {
	options: FORM_OPTIONS_TYPE[];
};
export type FORM_OPTIONS_TYPE = FormOption;

export const Z_QUESTION_TYPE = z.enum(["date", "varchar", "mChoice", "cb", "dd", "int", "file", "address", "photo"]);
export const FORM_OPTION = z.object({
	optionID: z.string().uuid(),
	optionValue: z.string(),
	correct: z.boolean().nullable(),
	nextSectionID: z.string().uuid().nullable(),
	questionID: z.string().uuid().nullable(),
});
export const FORM_QUESTION = z.object({
	questionID: z.string().uuid(),
	question: z.string(),
	questionType: Z_QUESTION_TYPE,
	required: z.boolean(),
	score: z.number().nullable(),
	sequence: z.number().nonnegative(),
	jumpToSectionBasedOnAnswer: z.boolean().nullable(),
	formSectionID: z.string().uuid().nullable(),
	options: z.array(FORM_OPTION),
});

export const FORM_SCORE = z.object({
	formId: z.string().uuid().nullable(),
	low: z.number().nullable(),
	high: z.number().nullable(),
	result: z.string().nullable(),
	id: z.string().uuid(),
});
export const FORM_SECTION = z.object({
	formSectionID: z.string().uuid(),
	sectionTitle: z.string(),
	sectionDesc: z.string(),
	seqNumber: z.number(),
	nextSectionID: z.string().uuid().nullable(),
	formId: z.string().uuid().nullable(),
	formQuestions: z.array(FORM_QUESTION),
});
export const Z_FORM = z.object({
	id: z.string().uuid(),
	formTitle: z.string(),
	formDescription: z.string(),
	defaultPointValue: z.number(),
	isQuizMode: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
	formScore: z.array(FORM_SCORE),
	formSections: z.array(FORM_SECTION),
});

export type ACCESS_CONTROL_USER = {
	email: string;
	employees?: ACCESS_CONTROL_USER[];
	firstname: string;
	id: number | null;
	lastname: string;
	phoneNumber: string;
	title: string;
};

export interface SAMPLE_DATA extends ACCESS_CONTROL_USER {
	role_box_id: string;
	children: SAMPLE_DATA[];
	reportingManager: string;
}
export type PATH_DATA = {
	id: string;
	source: string;
	target: string;
	type: "smoothstep";
};
export type BLOCKS_DATA = {
	id: string;
	data: { label: JSX.Element };
	position: { x: number; y: number };
};

export type SELECT_OPTIONS = {
	label: string;
	value: number;
};
