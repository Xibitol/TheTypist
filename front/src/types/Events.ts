type TTEventMap = "add" | "remove";
type TTEventInit = EventInit & {
	added: string,
	count: number,
	isMistake: boolean
};

export type {
	TTEventMap, TTEventInit
};