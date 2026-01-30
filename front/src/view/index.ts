import View from "@/view/View";
import Page from "@/view/Page";
import MainMenuPage from "@/view/MainMenuPage";
import TypingPage from "@/view/TypingPage";
import ScorePage from "@/view/ScorePage";

customElements.define("mainmenu-page", MainMenuPage);
customElements.define("typing-page", TypingPage);
customElements.define("score-page", ScorePage);

export {
	View,

	Page,
	MainMenuPage,
	TypingPage,
	ScorePage
};