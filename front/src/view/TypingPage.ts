import {TypedText, type TypistText} from "@p/model";
import type {TypedTextEvent} from "@p/event";
import {TypingListener} from "@p/controller";
import {Page} from "@p/view";
import TheTypist from "@/TheTypist";

import mmpTemplate from "@r/template/typing-page.html?string";
import mmpStyle from "@r/style/typing-page.css?string";

export default class TypingPage extends Page{

	private static readonly TIMER_DELAY = 30; // Not 1 for optimizations.

	private readonly context: TheTypist;
	private readonly listener: TypingListener;

	private _text?: TypistText = undefined;
	private typed?: TypedText = undefined;

	private timeInterval: number | null = null;

	/* HTML Elements */
	private readonly textParagraph: HTMLParagraphElement;
	private readonly textInput: HTMLInputElement;
	private readonly timerParagraph: HTMLParagraphElement;

	constructor(){
		super(mmpTemplate, mmpStyle);

		this.context = TheTypist.get();

		this.textParagraph = (
			this.shadow.getElementById("tp-text") as HTMLParagraphElement
		);
		this.textInput = (
			this.shadow.getElementById("tp-input") as HTMLInputElement
		);
		this.timerParagraph = (
			this.shadow.getElementById("tp-timer") as HTMLParagraphElement
		);

		// Listeners
		this.listener = new TypingListener(this.context, this);

		this.textInput.addEventListener("beforeinput",
			this.listener.onCharacterInput.bind(this.listener)
		);
		this.textInput.addEventListener("compositionend",
			this.listener.onCompositionEnd.bind(this.listener)
		);

		document.addEventListener("keydown",
			this.listener.onKeyDown.bind(this.listener)
		);
	}

	// GETTERS
	public get text(): TypistText | undefined{ return this._text; }

	public getTypedText(): TypedText | undefined{ return this.typed; }

	// SETTERS
	public setText(text: TypistText){
		if(this.isShown())
			throw Error("Unable to change text when page shown;");

		if(this.text !== undefined){
			this.textParagraph.querySelectorAll(".text--part")
				.forEach(c => c.remove());
			this.timerParagraph.textContent = "00:00.000";

			const textNode = this.textParagraph.lastChild;
			if(textNode instanceof Text) textNode.remove();

			if(this.typed !== undefined){
				this.typed.removeEventListener(TypedText.START_EVENT_NAME,
					this.onTypedTextStart.bind(this)
				);
				this.typed.removeEventListener(TypedText.ADD_EVENT_NAME,
					this.onTypedTextAdd.bind(this)
				);
				this.typed.removeEventListener(TypedText.REMOVE_EVENT_NAME,
					this.onTypedTextRemoved.bind(this)
				);
				this.typed.removeEventListener(TypedText.STOP_EVENT_NAME,
					this.onTypedTextStop.bind(this)
				);

				this.typed.removeEventListener(TypedText.STOP_EVENT_NAME,
					this.listener.onTypedTextStop.bind(this.listener)
				);
			}
		}

		this._text = text;

		if(this.text !== undefined){
			if(this._text.text !== null)
				this.textParagraph.append(new Text(this._text.text));
			this.timerParagraph.textContent = "00:00.000";

			this.typed = new TypedText(this._text);
			this.typed.addEventListener(TypedText.START_EVENT_NAME,
				this.onTypedTextStart.bind(this)
			);
			this.typed.addEventListener(TypedText.ADD_EVENT_NAME,
				this.onTypedTextAdd.bind(this)
			);
			this.typed.addEventListener(TypedText.REMOVE_EVENT_NAME,
				this.onTypedTextRemoved.bind(this)
			);
			this.typed.addEventListener(TypedText.STOP_EVENT_NAME,
				this.onTypedTextStop.bind(this)
			);

			this.typed.addEventListener(TypedText.STOP_EVENT_NAME,
				this.listener.onTypedTextStop.bind(this.listener)
			);
		}
	}

	// SETTERS
	private updateTimer(): void{
		if(this.typed === undefined) return;

		const d = new Date(this.typed.getTime());
		this.timerParagraph.textContent =
			`${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
	}

	// FUNCTIONS
	public focus(): void{
		this.textInput.focus({preventScroll: false});
	}

	// LISTENERS
	private onTypedTextStart(_event: TypedTextEvent): void{
		if(this.timeInterval !== null)
			clearInterval(this.timeInterval);

		this.timeInterval = setInterval(
			this.updateTimer.bind(this), TypingPage.TIMER_DELAY
		);
	}
	private onTypedTextAdd(event: TypedTextEvent): void{
		const className = !event.isMistake ?
			"text--part__valid" : "text--part__mistake";
		const textNode = this.textParagraph.lastChild;
		const lastPart = this.textParagraph.lastElementChild?.previousSibling;

		if(textNode instanceof Text)
			textNode.textContent = textNode.textContent.substring(1);

		if(lastPart instanceof HTMLSpanElement
			&& lastPart.classList.contains(className)
		)
			lastPart.textContent += event.added;
		else{
			const span = document.createElement("span");
			span.textContent = event.added;
			span.classList.add("text--part", className);

			this.textParagraph.insertBefore(span,
				this.textParagraph.lastElementChild
			);
		}
	}
	private onTypedTextRemoved(event: TypedTextEvent): void{
		const textNode = this.textParagraph.lastChild;
		const parts = this.textParagraph.querySelectorAll(".text--part");

		if(textNode instanceof Text)
			textNode.textContent = event.added.concat(textNode.textContent);

		let i = 0, child, cCount;
		while(i < event.count){
			if((child = parts.item(parts.length - 1)) === null)
				break; // Should never happen.

			cCount = Math.min(child.textContent.length, event.count);
			if(child.textContent.length > cCount)
				child.textContent = child.textContent.substring(0,
					child.textContent.length - cCount
				);
			else
				child.remove();

			i += cCount;
		}
	}
	private onTypedTextStop(_event: TypedTextEvent): void{
		if(this.timeInterval !== null)
			clearInterval(this.timeInterval);

		this.updateTimer();
	}
}