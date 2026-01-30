import {MainMenuPage, TypingPage, type ScorePage} from "@p/view";
import type TheTypist from "@/TheTypist";

export default class MainMenuListener{

	private context: TheTypist;
	private page: ScorePage;

	constructor(context: TheTypist, page: ScorePage){
		this.context = context;
		this.page = page;
	}

	// LISTENERS
	public onRetryClicked(_event: PointerEvent){
		if(this.page.score !== undefined && this.page.score.text !== null)
			this.context.getPage(TypingPage)!.setText(this.page.score.text);

		this.context.open(TypingPage);
	}
	public onQuitClicked(_event: PointerEvent){
		this.context.open(MainMenuPage);
	}
}