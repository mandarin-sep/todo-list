export interface TodoItem {
	key: string
	text: string
	status: 'doing' | 'done'
	tags: Array<string>
}
