import type TheTypist from "@/TheTypist";
import {MainMenuPage, type TypingPage} from "@p/view";
import {HighScore} from "@p/model";

export default class MainMenuListener{

	private context: TheTypist;
	private page: TypingPage;

	constructor(context: TheTypist, page: TypingPage){
		this.context = context;
		this.page = page;
	}

	// LISTENERS
	public onDebugSaveClicked(_event: PointerEvent){
		const highScore = new HighScore(
			Math.round(Math.random()*(3*60)*1000),
			Math.round(Math.random()*256),
			new Date(), this.page.text ?? null
		);

		this.context.setHighScore(highScore);
		this.context.getPage(MainMenuPage)!.shadow.append(JSON.stringify(
			this.context.highScore.toEntry()
		));
		this.context.open(MainMenuPage);
	}
}
