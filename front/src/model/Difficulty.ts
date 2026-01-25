export default class Difficulty{

	public static readonly EASY = new Difficulty(
		"EASY", "I'm a newbie", 1
	);
	public static readonly MEDIUM = new Difficulty(
		"MEDIUM", "Make me suffer", 2
	);
	public static readonly HARD = new Difficulty(
		"HARD", "Nightmare", 3
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
	public static get values(): Difficulty[]{
		return [
			Difficulty.EASY,
			Difficulty.MEDIUM,
			Difficulty.HARD
		];
	}

	// FUNCTIONS
	public static from(name: string): Difficulty{
		const d = Difficulty.values.find(d => d.name === name);

		if(d === undefined)
			throw new Error(`No such difficulty (Got "${name}");`);

		return d;
	}

	public toJSON(): string{ return this.name; }
}