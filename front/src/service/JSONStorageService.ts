import type {StorageService} from "@p/service";

import textsJSON from "@r/tt-tt-texts.json" with {type: "json"};

type StorageContent<T> = Array<T> | {[key: string]: T};

export default class JSONStorageService
	implements StorageService<StorageContent<unknown>>
{

	private files: Map<string, StorageContent<unknown>>;

	constructor(){
		this.files = new Map();

		// Files
		this.files.set("tt-tt-texts", textsJSON as {[key: string]: string});
	}

	// GETTERS
	public get<T>(id: string): Promise<StorageContent<T> | null>{
		return new Promise((resolve, reject) => {
			const f = this.files.get(id);

			if(f === undefined) reject(`No such file identified by ${id};`);
			else resolve(f as StorageContent<T>);
		});
	}

	// SETTERS
	public set<T>(_id: string, _value: StorageContent<T> | null): void{
		throw new Error("Unsupported operation;");
	}
}