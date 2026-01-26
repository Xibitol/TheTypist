import {MainMenuListener} from "@p/controller";
import {Page} from "@p/view";
import TheTypist from "@/TheTypist";

import mmpTemplate from "@r/template/mainmenu-page.html?string";
import mmpStyle from "@r/style/mainmenu-page.css?string";

export default class MainMenuPage extends Page{

	constructor(){
		super(mmpTemplate, mmpStyle);

		const context = TheTypist.get();

		// Listeners
		const listener = new MainMenuListener(context, this);

		this.shadow.getElementById("mmp-play")?.addEventListener("click",
			listener.onPlayButtonClicked.bind(listener)
		);

		this.addEventListener(Page.VISIBILITY_EVENT_NAME,
			listener.onPageVisibilityChanged.bind(listener)
		);
	}
}