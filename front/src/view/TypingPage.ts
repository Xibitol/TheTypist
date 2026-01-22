import type {TypistText} from "@p/model";
import Page from "@/view/Page";

import mmpTemplate from "@r/template/typing-page.html?string";
import mmpStyle from "@r/style/typing-page.css?string";

export default class TypingPage extends Page{

	private text?: TypistText = undefined;

	/* HTML Elements */
	private readonly textParagraph: HTMLParagraphElement;

	constructor(){
		super(mmpTemplate, mmpStyle);

		this.textParagraph = (
			this.shadow.getElementById("tp-text") as HTMLParagraphElement
		);
	}

	// SETTERS
	public setText(text: TypistText){
		if(this.isShown())
			throw Error("Unable to change text when page shown;");

		this.text = text;

		this.textParagraph.textContent = this.text.text ?? "";
	}
}