import type {Difficulty, Language, Theme} from "@p/model";

type JSONTypistText = {
	difficulty: Difficulty,
	language: Language,
	theme: Theme,
	number: number
};

type JSONHighScore = {
	time: number,
	mistakes: number,
	text: JSONTypistText
};

export type {
	JSONTypistText,
	JSONHighScore
};