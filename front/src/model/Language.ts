export default class Language{

	public static readonly FRENCH = new Language("FRENCH", "French");
	public static readonly ENGLISH = new Language("ENGLISH", "English");
	public static readonly LATIN = new Language("LATIN", "Latin");

	public readonly name: string;
	public readonly label: string;

	private constructor(name: string, label: string){
		this.name = name;
		this.label = label;
	}

	// GETTERS
	public static get values(): Language[]{
		return [
			Language.FRENCH,
			Language.ENGLISH,
			Language.LATIN
		];
	}

	// FUNCTIONS
	public static from(name: string): Language{
		const l = Language.values.find(l => l.name === name);

		if(l === undefined)
			throw new Error(`No such language (Got "${name}");`);

		return l;
	}

	public toJSON(): string{ return this.name; }
}