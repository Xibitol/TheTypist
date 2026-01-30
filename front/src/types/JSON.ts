import type {Difficulty, Language, Theme} from "@p/model";

type JSONTypistText = {
	difficulty: Difficulty,
	language: Language,
	theme: Theme,
	number: number
};
type JSONTexts = {
	[key: string]: string
};

type JSONHighScore = {
	time: number,
	mistakes: number,
	date: number, // Milliseconds
	text: JSONTypistText | null
};

export type {
	JSONTypistText,
	JSONTexts,

	JSONHighScore
};