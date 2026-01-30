import {View} from "@p/view";

import pageStyle from "@r/style/page.css?string";

export default abstract class Page extends View{

	public static readonly VISIBILITY_EVENT_NAME = "visibility";

	constructor(htmlTemplate: string, cssStyle: string){
		super(htmlTemplate, cssStyle + pageStyle);
	}

	// GETTERS
	public isShown(){
		return this.style.display === "";
	}

	// FUNCTIONS
	public hide(){
		this.style.display = "none";
		this.dispatchEvent(new Event(Page.VISIBILITY_EVENT_NAME));
	}
	public show(){
		this.style.display = "";
		this.dispatchEvent(new Event(Page.VISIBILITY_EVENT_NAME));
	}
}