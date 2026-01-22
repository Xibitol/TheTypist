import {StorageService} from "@p/service";

export default abstract class NavigatorStorageService
	extends StorageService<string | null>
{

	private storage: Storage;

	constructor(storage: Storage){
		super();

		this.storage = storage;
	}

	// GETTERS
	public get(id: string): Promise<string | null>{
		return new Promise((resolve, _reject) => resolve(
			this.storage.getItem(id)
		));
	}

	// SETTERS
	public set(id: string, value: string | null): void{
		this.storage.setItem(id, `${value}`);
	}
}