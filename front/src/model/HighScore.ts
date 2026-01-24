import type {JSONHighScore} from "@/types/JSON";

import type {NavigatorStorageService} from "@p/service";
import {Model, TypistText} from "@p/model";

export default class HighScore extends Model{

	private static readonly STORAGE_ID = "tt-highscore";

	public readonly time: number; // In seconds.
	public readonly mistakes: number;
	private readonly _date: Date;
	public readonly text: TypistText | null;

	public constructor(
		time: number,
		mistakes: number,
		date: Date,
		text: TypistText | null
	){
		super();

		HighScore.assertTime(time);
		HighScore.assertMistakes(mistakes);
		// if(mistakes > text.length)
		// 	throw RangeError(
		// 		`Time must be a positive integer (Got ${time.toString()});`
		// 	);

		this.time = time;
		this.mistakes = mistakes;
		this._date = date;
		this.text = text;
	}

	// GETTERS
	public get date(): Date{ return new Date(this._date); }

	// FUNCTIONS
	public static fromDefaults(): HighScore{
		return new HighScore(0, 0, new Date(0), null);
	}
	public static from(data: object): HighScore{
		const hsData = data as JSONHighScore;

		console.log(typeof hsData.time != "number"
			|| typeof hsData.mistakes != "number"
			|| typeof hsData.date != "number"
			|| (hsData.text !== null && typeof hsData.text != "object"));
		if(typeof hsData.time != "number"
			|| typeof hsData.mistakes != "number"
			|| typeof hsData.date != "number"
			|| (hsData.text !== null && typeof hsData.text != "object")
		){
			throw new Error(
				`HighScore can't be recognized (Got "${JSON.stringify(hsData)}");`
			);
		}

		return new HighScore(
			hsData.time,
			hsData.mistakes,
			new Date(hsData.date),
			hsData.text !== null ? TypistText.from(hsData.text) : null
		);
	}
	public static async load(storage: NavigatorStorageService):
		Promise<HighScore>
	{
		try{
			const v = await storage.getJSON(HighScore.STORAGE_ID);
			if(typeof v !== "object")
				throw Error();

			return HighScore.from(v as object);
		}catch(e){
			return HighScore.fromDefaults();
		}
	}

	public betterThan(_other: HighScore): boolean{
		// TODO: To implement.
		return true;
	}

	public toEntry(): JSONHighScore{
		return {
			time: this.time,
			mistakes: this.mistakes,
			date: this.date.valueOf(),
			text: this.text !== null ? this.text.toEntry() : null
		};
	}

	public save(storage: NavigatorStorageService): void{
		storage.setJSON(HighScore.STORAGE_ID, this.toEntry());
	}

	// ASSERTIONS
	private static assertTime(time: number){
		if(!Number.isInteger(time) || time < 0)
			throw new RangeError(
				`Time must be a positive integer (Got ${time.toString()});`
			);
	}
	private static assertMistakes(mistakes: number){
		if(!Number.isInteger(mistakes) || mistakes < 0)
			throw new RangeError(
				`Mistakes must be a positive integer (Got ${mistakes.toString()});`
			);
	}
}