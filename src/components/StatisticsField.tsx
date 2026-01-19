import type { TodoItem } from '../types/todo'

const StatisticsField = ({ todos }: { todos: Array<TodoItem> }) => {
	const total = todos.length
	const done = todos.filter((todo: TodoItem) => todo.status === 'done').length
	const doing = todos.filter((todo: TodoItem) => todo.status === 'doing').length
	return (
		<div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
			<h2 className="text-lg font-semibold text-gray-900">통계</h2>
			<div className="mt-4">
				<p className="text-sm text-gray-500">총 할 일: {total}</p>
				<p className="text-sm text-gray-500">완료: {done}</p>
				<p className="text-sm text-gray-500">진행중: {doing}</p>
			</div>
		</div>
	)
}

export default StatisticsField
