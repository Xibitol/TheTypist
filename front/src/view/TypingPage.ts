import type {TypistText} from "@p/model";
import {TypingListener} from "@p/controller";
import {Page} from "@p/view";
import TheTypist from "@/TheTypist";

import mmpTemplate from "@r/template/typing-page.html?string";
import mmpStyle from "@r/style/typing-page.css?string";

export default class TypingPage extends Page{

	private context: TheTypist;
	private _text?: TypistText = undefined;

	/* HTML Elements */
	private readonly textParagraph: HTMLParagraphElement;

	constructor(){
		super(mmpTemplate, mmpStyle);

		this.context = TheTypist.get();

		this.textParagraph = (
			this.shadow.getElementById("tp-text") as HTMLParagraphElement
		);

		// Listeners
		const listener = new TypingListener(this.context, this);

		this.shadow.getElementById("tp-debug-save")?.addEventListener("click",
			listener.onDebugSaveClicked.bind(listener)
		);
	}

	// GETTERS
	public get text(): TypistText | undefined{ return this._text; }

	// SETTERS
	public setText(text: TypistText){
		if(this.isShown())
			throw Error("Unable to change text when page shown;");

		this._text = text;

		this.textParagraph.textContent = this._text.text ?? "";
	}
}