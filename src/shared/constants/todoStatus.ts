export const TODO_STATUS = {
	ALL: '',
	DOING: 'doing',
	DONE: 'done'
} as const

export type TodoStatus = typeof TODO_STATUS[keyof typeof TODO_STATUS]

export const TODO_STATUS_LABEL: Record<TodoStatus, string> = {
	'': '전체',
	doing: '진행중',
	done: '완료'
}

export const TODO_STATUS_OPTIONS: Array<{ value: TodoStatus; label: string }> = [
	{ value: TODO_STATUS.ALL, label: TODO_STATUS_LABEL[''] },
	{ value: TODO_STATUS.DOING, label: TODO_STATUS_LABEL.doing },
	{ value: TODO_STATUS.DONE, label: TODO_STATUS_LABEL.done }
]
