import type {StorageService, JSONifiableStorage} from "@p/service";

export default class NavigatorStorageService
	implements StorageService<string | null>, JSONifiableStorage
{

	private storage: Storage;

	constructor(storage: Storage){
		this.storage = storage;
	}

	// GETTERS
	public get(id: string): Promise<string | null>{
		return new Promise((resolve, _reject) => resolve(
			this.storage.getItem(id)
		));
	}
	public async getJSON(id: string): Promise<unknown>{
		const v = await this.get(id);
    	return v !== null ? JSON.parse(v) : null;
	}

	// SETTERS
	public set(id: string, value: string | null): void{
		this.storage.setItem(id, `${value}`);
	}
	public setJSON(id: string, value: unknown): void{
		this.set(id, JSON.stringify(value));
	}
}