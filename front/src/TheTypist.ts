import {JSONStorageService, NavigatorStorageService} from "@p/service";
import {Page, MainMenuPage} from "@p/view";
import {HighScore} from "@p/model";

export default class TheTypist{

	private static instance?: TheTypist;

	public readonly navigatorStorage: NavigatorStorageService;
	public readonly jsonStorage: JSONStorageService;

	private _highScore: HighScore = HighScore.fromDefaults();

	/* HTML Elements */
	private readonly pages: Page[] = [];

	private constructor(){
		this.navigatorStorage = new NavigatorStorageService(localStorage);
		this.jsonStorage = new JSONStorageService();

		// Listeners
		self.addEventListener("load", this.run.bind(this, self), {
			once: true
		});
	}

	// GETTERS
	public static get(): TheTypist{
		if(this.instance === undefined)
			this.instance = new TheTypist();

		return this.instance;
	}

	public get highScore(): HighScore{ return this._highScore; }
	public getPage<P extends Page>(pageClass: new() => P): P | undefined{
		return this.pages.find(p => p instanceof pageClass) as P;
	}

	// SETTERS
	public setHighScore(highScore: HighScore){
		if(!this.highScore.betterThan(highScore))
			return;

		this._highScore = highScore;
		this.highScore.save(this.navigatorStorage);
	}

	// FUNCTIONS
	public run(_window: Window){
		console.log(`${TheTypist.name}, v1.0.0-b.0 is loading.`);

		HighScore.load(this.navigatorStorage)
			.then(this.setHighScore.bind(this), console.warn)
			.then(() => this.getPage(MainMenuPage)!.shadow.append(
				JSON.stringify(this.highScore.toEntry())
			));

		this.pages.push(
			...Array.from(document.querySelectorAll("#pages *"))
				.filter(e => e instanceof Page)
		);

		this.open(MainMenuPage);
	}

	public open<P extends Page>(pageClass: new() => P){
		const page = this.pages.find(p => p instanceof pageClass);
		if(page === undefined)
			throw new Error(`No such page of type ${pageClass};`);

		this.pages.filter(p => p !== page).forEach(p => p.hide());
		page.show();
	}
}