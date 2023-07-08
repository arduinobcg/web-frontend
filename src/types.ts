export interface item {
	hi: number;
	date: { $date: Date };
}
export interface device {
	name: string;
	queueName: string;
	icon: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	guid: string;
}
