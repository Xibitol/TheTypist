type TTEventMap = "start" | "add" | "remove" | "stop";
type TTEventInit = EventInit & {
	added: string,
	count: number,
	isMistake: boolean
};

export type {
	TTEventMap, TTEventInit
};