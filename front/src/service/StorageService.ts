export default abstract class StorageService{

	// GETTERS
	public abstract get(id: string): Promise<string | null>;

	// SETTERS
	public abstract set(id: string, value: string | null): void;
	public setJSON(id: string, value: unknown): void{
		this.set(id, JSON.stringify(value));
	}
}