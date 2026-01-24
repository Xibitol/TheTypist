export default class Difficulty{

	public static readonly EASY = new Difficulty("EASY", "I'm a newbie");
	public static readonly MEDIUM = new Difficulty("MEDIUM", "Make me suffer");
	public static readonly HARD = new Difficulty("HARD", "Nightmare");

	public readonly name: string;
	public readonly label: string;

	private constructor(name: string, label: string){
		this.name = name;
		this.label = label;
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