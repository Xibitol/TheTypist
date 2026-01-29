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

	public static readonly START_EVENT_NAME = "start";
	public static readonly ADD_EVENT_NAME = "add";
	public static readonly REMOVE_EVENT_NAME = "remove";
	public static readonly STOP_EVENT_NAME = "stop";

	public readonly text: TypistText;
	private _answer: string = "";
	private startTime: number | null = null;
	private stopTime: number | null = null;

	public constructor(text: TypistText){
		super();
		
		this.text = text;
	}

	// GETTERS
	public get answer(): string{ return this._answer; }

	public isAnswerComplete(): boolean{
		return this.answer.length === this.text.text?.length;
	}
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
	public getStopTime(): number{
		return this.stopTime ?? Date.now();
	}
	public getTime(): number{
		return this.getStopTime() - (this.startTime ?? 0);
	}
	public getHighscore(): HighScore{
		if(!this.isAnswerComplete())
			throw new Error(
				"Answer isn't complete (With or without mistakes);"
			);

		return new HighScore(
			this.getTime(),
			this.getDifferences(),
			new Date((this.startTime ?? 0) + this.getTime()),
			this.text
		);
	}

	// SETTERS
	public addCharacter(char: string): void{
		if(this.isAnswerComplete())
			throw new Error("Can't add a character after answer is complete;");
		else if(char.length !== 1)
			throw new Error("There should be only one char;");

		this._answer = this.answer.concat(char);

		// Events
		const eventInit = {
			added: char,
			count: 0,
			isMistake: this.text.text !== null && this.text.text != undefined ?
				char !== this.text.text.at(this.answer.length - 1) : false,
			cancelable: false
		};

		if(this.startTime === null){
			this.startTime = Date.now();

			this.dispatchEvent(
				new TypedTextEvent(TypedText.START_EVENT_NAME, eventInit)
			);
		}
		this.dispatchEvent(
			new TypedTextEvent(TypedText.ADD_EVENT_NAME, eventInit)
		);
		if(this.isAnswerComplete()){
			this.stopTime = Date.now();

			this.dispatchEvent(
				new TypedTextEvent(TypedText.STOP_EVENT_NAME, eventInit)
			);
		}
	}
	public removeCharacter(): void{
		if(this.isAnswerComplete())
			throw new Error("Can't add a character after answer is complete;");
		else if(this.answer.length === 0)
			return;

		this._answer = this.answer.substring(0, this.answer.length - 1);

		this.dispatchEvent(new TypedTextEvent(TypedText.REMOVE_EVENT_NAME, {
			added: this.text.text?.at(this.answer.length) ?? "",
			count: 1,
			isMistake: false,
			cancelable: false
		}));
	}
}

export default TypedText;