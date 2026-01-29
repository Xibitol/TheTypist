import type {TTEventMap} from "@/types/Events";

import {Model, type TypistText, HighScore} from "@p/model";
import {TypedTextEvent} from "@p/event";

interface TypedText extends Model{
	addEventListener(
		type: TTEventMap,
		listener: (this: TypedText, event: TypedTextEvent) => unknown,
		options?: boolean | EventListenerOptions
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	): void;

	removeEventListener(
		type: TTEventMap,
		callback: (this: TypedText, event: TypedTextEvent) => unknown,
		options?: EventListenerOptions | boolean
	): void;
	removeEventListener(
		type: string,
		callback: EventListenerOrEventListenerObject | null,
		options?: EventListenerOptions | boolean
	): void;
}

class TypedText extends Model{

	public static readonly ADD_EVENT_NAME = "add";
	public static readonly REMOVE_EVENT_NAME = "remove";

	public readonly text: TypistText;
	private _answer: string = "";

	public constructor(text: TypistText){
		super();
		
		this.text = text;
	}

	// GETTERS
	public get answer(): string{ return this._answer; }

	public getDifferences(): number{
		if(this.text.text === undefined || this.text.text === null)
			throw new Error("TypistText text isn't available;");
		let differences = 0;

		for(let i = 0; i < this.answer.length && i < this.text.text.length; i++)
			if(this.answer[i] !== this.text.text[i])
				differences++;

		if(this.answer.length !== this.text.text.length)
			differences += Math.abs(this.answer.length - this.text.text.length);

		return differences;
	}
	public getHighscore(): HighScore{
		return new HighScore(0, this.getDifferences(), new Date(), this.text);
	}

	// SETTERS
	public addCharacter(char: string): void{
		if(char.length !== 1)
			throw new Event("There should be only one char;");

		this._answer = this._answer.concat(char);

		this.dispatchEvent(new TypedTextEvent(TypedText.ADD_EVENT_NAME, {
			added: char,
			count: 0,
			isMistake: char !== (this.text.text?.at(this._answer.length - 1) ?? char),
			cancelable: false
		}));
	}
	public removeCharacter(): void{
		if(this._answer.length === 0) return;
		this._answer = this._answer.substring(0, this._answer.length - 1);

		this.dispatchEvent(new TypedTextEvent(TypedText.REMOVE_EVENT_NAME, {
			added: this.text.text?.at(this._answer.length) ?? "",
			count: 1,
			isMistake: false,
			cancelable: false
		}));
	}
}

export default TypedText;