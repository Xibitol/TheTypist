import type {TTEventInit} from "@/types/Events";

export default class TypedTextEvent extends Event{

	public readonly added: string = "";
	public readonly count: number = 0;
	public readonly isMistake: boolean = false;

	public constructor(type: string, eventInitDict?: TTEventInit){
		super(type, eventInitDict);

		if(eventInitDict !== undefined){
			TypedTextEvent.assertAdded(eventInitDict.added);
			TypedTextEvent.assertCount(eventInitDict.count);

			this.added = eventInitDict.added;
			this.count = eventInitDict.count;
			this.isMistake = eventInitDict.isMistake;
		}
	}

	// ASSERTIONS
	private static assertAdded(added: string){
		if(added.length > 1)
			throw new Error(`There should be only one added character (Got \"${added}\");`);
	}
	private static assertCount(count: number){
		if(count < 0)
			throw new Error(`Character count should be a positive integer (Got ${count});`);
	}
}