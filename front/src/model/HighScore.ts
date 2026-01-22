import type {JSONHighScore} from "@/types/JSON";

import {Model, TypistText} from "@p/model";

export default class HighScore extends Model{

	public readonly time: number; // In seconds.
	public readonly mistakes: number;
	public readonly text: TypistText;

	public constructor(time: number, mistakes: number, text: TypistText){
		super();

		HighScore.assertTime(length);
		HighScore.assertMistakes(mistakes);
		if(mistakes > TypistText.length)
			throw RangeError(
				`Time must be a positive integer (Got ${time.toString()});`
			);

		this.time = time;
		this.mistakes = mistakes;
		this.text = text;
	}

	// FUNCTIONS
	public toEntry(): JSONHighScore{
		return {
			time: this.time,
			mistakes: this.mistakes,
			text: this.text.toEntry()
		};
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