export default abstract class StorageService<T>{

	// GETTERS
	public abstract get(id: string): Promise<T | null>;

	// SETTERS
	public abstract set(id: string, value: T | null): void;
}