import Page from "@/view/Page";

import mmpTemplate from "@r/template/typing-page.html?string";
import mmpStyle from "@r/style/typing-page.css?string";

export default class TypingPage extends Page{

	constructor(){
		super(mmpTemplate, mmpStyle);
	}
}