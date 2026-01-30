import type {JSONTypistText, JSONTexts} from "@/types/JSON";

import type {JSONStorageService} from "@p/service";
import {Model, Difficulty, Language, Theme} from "@p/model";

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
		return `${this.difficulty.name}.${this.language.name}.${this.theme.name}-${this.number}`;
	}

	// FUNCTIONS
	public static from(data: object): TypistText{
		const ttData = data as JSONTypistText;

		if(typeof ttData.difficulty != "string"
			|| typeof ttData.language != "string"
			|| typeof ttData.theme != "string"
			|| typeof ttData.number != "number"
		)
			throw new Error(
				`TypistText can't be recognized (Got "${JSON.stringify(ttData)}");`
			);

		return new TypistText(
			Difficulty.from(ttData.difficulty),
			Language.from(ttData.language),
			Theme.from(ttData.theme),
			ttData.number
		);
	}

	public async loadText(storage: JSONStorageService): Promise<TypistText>{
		const v = await storage.get(TypistText.TEXTS_STORAGE_ID);
		if(v === null || !(v instanceof Object))
			throw Error(`Unexpected array in texts (${v});`);

		this._text = (v as JSONTexts)[this.getTextIdentifier()] ?? null;
		if(this._text === null)
			throw Error("No such text;");

    	return this;
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