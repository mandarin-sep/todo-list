export interface TodoStore {
	list: Array<TodoItem>
	addTodo: (todo: TodoItem) => void
	removeTodo: (todo: TodoItem) => void
	toggleStatus: (todo: TodoItem) => void
	deleteTagFromTodo: (todo: TodoItem, tag: string) => void
}

export interface TodoItem {
	key: string
	text: string
	status: 'doing' | 'done'
	tags: Array<string>
}

export interface TagStore {
	tags: Array<string>
	addTag: (tag: string) => void
	removeTag: (tag: string) => void
}
