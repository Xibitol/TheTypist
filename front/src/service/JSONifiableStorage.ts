export default interface JSONifiableStorage{

	// GETTERS
	getJSON(id: string): Promise<unknown>;

	// SETTERS
	setJSON(id: string, value: unknown): void;
}
