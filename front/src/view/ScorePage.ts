import type {HighScore} from "@p/model";
import {ScoreListener} from "@p/controller";
import {Page} from "@p/view";
import TheTypist from "@/TheTypist";

import spTemplate from "@r/template/score-page.html?string";
import spStyle from "@r/style/score-page.css?string";

export default class ScorePage extends Page{

	private _score?: HighScore;

	/* HTML Elements */
	private readonly scoreHeader: HTMLHeadingElement;
	private readonly timeSpan: HTMLSpanElement;
	private readonly mistakesSpan: HTMLSpanElement;

	private readonly difficultySpan: HTMLSpanElement;
	private readonly languageSpan: HTMLSpanElement;
	private readonly themeSpan: HTMLSpanElement;

	public constructor(){
		super(spTemplate, spStyle);

		const context = TheTypist.get();

		// Elements
		this.scoreHeader = (
			this.shadow.getElementById("sp-score") as HTMLHeadingElement
		);
		this.timeSpan = (
			this.shadow.getElementById("sp-time") as HTMLSpanElement
		);
		this.mistakesSpan = (
			this.shadow.getElementById("sp-mistakes") as HTMLSpanElement
		);

		this.difficultySpan = (
			this.shadow.getElementById("sp-difficulty") as HTMLSpanElement
		);
		this.languageSpan = (
			this.shadow.getElementById("sp-language") as HTMLSpanElement
		);
		this.themeSpan = (
			this.shadow.getElementById("sp-theme") as HTMLSpanElement
		);

		// Listeners
		const listener = new ScoreListener(context, this);

		this.shadow.getElementById("sp-retry")!.addEventListener("click",
			listener.onRetryClicked.bind(listener)
		);
		this.shadow.getElementById("sp-quit")!.addEventListener("click",
			listener.onQuitClicked.bind(listener)
		);
	}

	// GETTERS
	public get score(): HighScore | undefined{ return this._score; }

	// SETTERS
	public setScore(score: HighScore): void{
		this._score = score;

		const d = new Date(this.score!.time);
		this.scoreHeader.textContent = this.score!.getScore().toFixed(2);
		this.timeSpan.textContent =
			`${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
		this.mistakesSpan.textContent = this.score!.mistakes.toString();

		if(this.score!.text !== null){
			const t = this.score!.text;

			this.difficultySpan.textContent = t.difficulty.label;
			this.languageSpan.textContent = t.language.label;
			this.themeSpan.textContent = t.theme.label.toLowerCase();
		}
	}
}