export default class Theme{

	public static readonly STORY = new Theme("STORY", "Story");
	public static readonly LAW = new Theme("LAW", "European Constitution");
	public static readonly SCIENTIFIC = new Theme(
		"SCIENTIFIC", "Scientific"
	);
	public static readonly RANDOM = new Theme("RANDOM", "Random");

	public readonly name: string;
	public readonly label: string;

	private constructor(name: string, label: string){
		this.name = name;
		this.label = label;
	}

	// GETTERS
	public static get values(): Theme[]{
		return [
			Theme.STORY,
			Theme.LAW,
			Theme.SCIENTIFIC,
			Theme.RANDOM
		];
	}

	// FUNCTIONS
	public toString(): string{ return this.name; }
}