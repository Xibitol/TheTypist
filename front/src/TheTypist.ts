import {type NavigatorStorageService, LocalStorageService} from "@p/service";
import {Page, MainMenuPage} from "@p/view";

export default class TheTypist{

	private static instance?: TheTypist;

	public readonly navigatorStorage: NavigatorStorageService;

	/* HTML Elements */
	private readonly pages: Page[] = [];

	constructor(){
		this.navigatorStorage = new LocalStorageService();

		// Listeners
		self.addEventListener("load", this.run.bind(this, self));
	}

	// GETTERS
	public static get(): TheTypist{
		if(this.instance === undefined)
			this.instance = new TheTypist();

		return this.instance;
	}

	// FUNCTIONS
	public run(_window: Window){
		console.log(`${TheTypist.name}, v1.0.0-b.0 is loading.`)

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