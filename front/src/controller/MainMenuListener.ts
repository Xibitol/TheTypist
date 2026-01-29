import {Difficulty, Language, Theme, TypistText} from "@p/model";
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
	public onFormSubmitted(event: SubmitEvent){
		if(!(event.currentTarget instanceof HTMLFormElement))
			return;

		const difficultySelect = event.currentTarget.elements.namedItem(
			"difficulty"
		);
		const languageSelect = event.currentTarget.elements.namedItem(
			"langage"
		);
		const themeSelect = event.currentTarget.elements.namedItem(
			"theme"
		);
		if(!(difficultySelect instanceof HTMLSelectElement)) return;
		if(!(languageSelect instanceof HTMLSelectElement)) return;
		if(!(themeSelect instanceof HTMLSelectElement)) return;

		new TypistText(
			Difficulty.from(difficultySelect.value),
			Language.from(languageSelect.value),
			Theme.from(themeSelect.value),
			0
		).loadText(this.context.jsonStorage).then(text => {
			this.context.getPage(TypingPage)!.setText(text);
			this.context.open(TypingPage);
		});

		event.preventDefault();
	}

	public onPageVisibilityChanged(_event: Event){
		if(this.page.isShown())
			this.page.shadow.append(
				"\n" + JSON.stringify(this.context.highScore.toEntry())
				+ ` -> ${this.context.highScore.getScore().toFixed(2)}`
			);
	}
}