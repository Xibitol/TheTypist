import type {JSONTypistText} from "@/types/JSON";

import {Model, type Difficulty, type Language, type Theme} from "@p/model";

export default class TypistText extends Model{

	private static TEXTS_STORAGE_ID = "tt-tt-texts";

	public readonly difficulty: Difficulty;
	public readonly language: Language;
	public readonly theme: Theme;
	public readonly number: number;
	private text: string = "";

	public constructor(
		difficulty: Difficulty,
		language: Language,
		theme: Theme,
		number: number
	){
		super();

		TypistText.assertNumber(number);

		this.difficulty = difficulty;
		this.language = language;
		this.theme = theme;
		this.number = number;
	}

	// GETTERS
	public getTextIdentifier(): string{
		return `${this.difficulty}.${this.language}.${this.theme}-${this.number}`;
	}

	public toEntry(): JSONTypistText{
		return {
			difficulty: this.difficulty,
			language: this.language,
			theme: this.theme,
			number: this.number
		};
	}

	// ASSERTIONS
	private static assertNumber(number: number){
		if(!Number.isInteger(number) || number < 0)
			throw new RangeError(
				`Number must be a positive integer (Got ${number.toString()});`
			);
	}
}