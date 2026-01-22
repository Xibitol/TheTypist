import type {JSONTypistText, JSONTexts} from "@/types/JSON";

import type {JSONStorageService} from "@p/service";
import {Model, type Difficulty, type Language, type Theme} from "@p/model";

export default class TypistText extends Model{

	private static TEXTS_STORAGE_ID = "tt-tt-texts";

	public readonly difficulty: Difficulty;
	public readonly language: Language;
	public readonly theme: Theme;
	public readonly number: number;
	private _text?: string | null;

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
	public get text(): string | null | undefined{
		return this._text;
	}
	public get length(): number | undefined{
		return this.text?.length;
	}

	public getTextIdentifier(): string{
		return `${this.difficulty}.${this.language}.${this.theme}-${this.number}`;
	}

	// FUNCTIONS
	public loadText(storage: JSONStorageService){
		storage.get(TypistText.TEXTS_STORAGE_ID).then(v => {
			if(v === null || !(v instanceof Object))
				throw Error(`Unexpected array in texts (${v});`);

			this._text = (v as JSONTexts)[this.getTextIdentifier()] ?? null;
		}).catch(console.error);
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