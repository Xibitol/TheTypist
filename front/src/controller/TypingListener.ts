import {MainMenuPage, type TypingPage} from "@p/view";
import type TheTypist from "@/TheTypist";

export default class MainMenuListener{

	private readonly context: TheTypist;
	private readonly page: TypingPage;

	constructor(context: TheTypist, page: TypingPage){
		this.context = context;
		this.page = page;
	}

	// LISTENERS
	public onKeyDown(_event: KeyboardEvent){
		if(this.page.isShown()
			&& this.page.text !== undefined
		)
			this.page.focus();
	}
	public onCharacterInput(event: InputEvent){
		const typed = this.page.getTypedText();
		if(typed === undefined) return;

		switch(event.inputType){
			case "insertText":
				if(event.data !== null && event.data.length === 1)
					typed.addCharacter(event.data);
				break;
			case "deleteContentBackward":
				typed.removeCharacter();
				break;
			default:
				break;
		}

		event.preventDefault();
	}
	public onCompositionEnd(event: CompositionEvent){
		const typed = this.page.getTypedText();
		if(typed === undefined) return;

		if(event.data.length !== 0){
			typed.addCharacter(event.data);
			(event.currentTarget as HTMLInputElement).value = "";
		}

		event.preventDefault();
	}

	public onDebugSaveClicked(_event: PointerEvent){
		this.context.setHighScore(this.page.getTypedText()!.getHighscore());
		this.context.open(MainMenuPage);
	}
}
