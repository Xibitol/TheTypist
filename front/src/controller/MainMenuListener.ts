import {type MainMenuPage, TypingPage} from "@p/view";
import type TheTypist from "@/TheTypist";
import {Difficulty, Language, Theme, TypistText} from "@p/model";

export default class MainMenuListener{

	private context: TheTypist;
	private page: MainMenuPage;

	private t: TypistText;

	constructor(context: TheTypist, page: MainMenuPage){
		this.context = context;
		this.page = page;

		this.t = new TypistText(
			Difficulty.MEDIUM, Language.FRENCH, Theme.STORY, 0
		);
		this.t.loadText(this.context.jsonStorage);
	}

	// LISTENERS
	public onPlayButtonClicked(_event: PointerEvent){
		this.context.getPage(TypingPage)!.setText(this.t);
		this.context.open(TypingPage);
	}
}