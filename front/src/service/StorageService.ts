export default interface StorageService<T>{

	// GETTERS
	get(id: string): Promise<T | null>;

	// SETTERS
	set(id: string, value: T | null): void;
}