import {type MainMenuPage, TypingPage} from "@p/view";
import type TheTypist from "@/TheTypist";

export default class MainMenuListener{

	private context: TheTypist;
	private page: MainMenuPage;

	constructor(context: TheTypist, page: MainMenuPage){
		this.context = context;
		this.page = page;
	}

	// LISTENERS
	public onPlayButtonClicked(_event: PointerEvent){
		this.context.open(TypingPage);
	}
}