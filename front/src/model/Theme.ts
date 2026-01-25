export default class Theme{

	public static readonly STORY = new Theme(
		"STORY", "Story", 1
	);
	public static readonly LAW = new Theme(
		"LAW", "European Constitution", 2
	);
	public static readonly SCIENTIFIC = new Theme(
		"SCIENTIFIC", "Scientific", 3
	);
	public static readonly RANDOM = new Theme(
		"RANDOM", "Random", 4
	);

	public readonly name: string;
	public readonly label: string;
	public readonly coefficient: number;

	private constructor(name: string, label: string, coefficient: number){
		this.name = name;
		this.label = label;
		this.coefficient = coefficient;
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
	public static from(name: string): Theme{
		const t = Theme.values.find(t => t.name === name);

		if(t === undefined)
			throw new Error(`No such theme (Got "${name}");`);

		return t;
	}

	public toJSON(): string{ return this.name; }
}