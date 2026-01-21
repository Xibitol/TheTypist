import {View} from "@p/view";

import pageStyle from "@r/style/page.css?string";

export default abstract class Page extends View{

	constructor(htmlTemplate: string, cssStyle: string){
		super(htmlTemplate, cssStyle + pageStyle);
	}

	// FUNCTIONS
	public hide(){ this.style.display = "none"; }
	public show(){ this.style.display = ""; }
}