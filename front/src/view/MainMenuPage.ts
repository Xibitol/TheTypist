import {Difficulty, Language, Theme, HighScore} from "@p/model";
import {MainMenuListener} from "@p/controller";
import {Page} from "@p/view";
import TheTypist from "@/TheTypist";

import mmpTemplate from "@r/template/mainmenu-page.html?string";
import mmpStyle from "@r/style/mainmenu-page.css?string";

export default class MainMenuPage extends Page{

	/* HTML Elements */
	private readonly highScoreSpan: HTMLSpanElement;

	public constructor(){
		super(mmpTemplate, mmpStyle);

		const context = TheTypist.get();

		this.highScoreSpan = (
			this.shadow.getElementById("mmp-highScore") as HTMLSpanElement
		);

		const difficultySelect = (
			this.shadow.getElementById("mmp-difficulty") as HTMLSelectElement
		);
		for(const d of Difficulty.values){
			const option = document.createElement("option");
			option.value = d.name;
			option.textContent = d.label;
			difficultySelect.append(option);
		}
		const langageSelect = (
			this.shadow.getElementById("mmp-langage") as HTMLSelectElement
		);
		for(const l of Language.values){
			const option = document.createElement("option");
			option.value = l.name;
			option.textContent = l.label;
			langageSelect.append(option);
		}
		const themeSelect = (
			this.shadow.getElementById("mmp-theme") as HTMLSelectElement
		);
		for(const t of Theme.values){
			const option = document.createElement("option");
			option.value = t.name;
			option.textContent = t.label;
			themeSelect.append(option);
		}

		// Listeners
		const listener = new MainMenuListener(context, this);

		this.shadow.getElementById("mmp-form")!.addEventListener("submit",
			listener.onFormSubmitted.bind(listener)
		);

		this.addEventListener(Page.VISIBILITY_EVENT_NAME,
			listener.onPageVisibilityChanged.bind(listener)
		);
	}

	// SETTERS
	public setHighScore(highScore: HighScore): void{
		this.highScoreSpan.textContent = highScore.getScore().toFixed(2);
	}
}