import View from "@/view/View";
import Page from "@/view/Page";
import MainMenuPage from "@/view/MainMenuPage";
import TypingPage from "@/view/TypingPage";

customElements.define("mainmenu-page", MainMenuPage);
customElements.define("typing-page", TypingPage);

export {
	View,

	Page,
	MainMenuPage,
	TypingPage
};