import type { TodoItem } from '../../../../shared/types/todo'

const StatisticsField = ({ todos }: { todos: Array<TodoItem> }) => {
	const total = todos.length
	const done = todos.filter((todo: TodoItem) => todo.status === 'done').length
	const doing = todos.filter((todo: TodoItem) => todo.status === 'doing').length
	return (
		<>
			<div className="mt-5 grid grid-cols-3 gap-3">
				<div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
					<p className="text-sm font-normal text-gray-500">전체</p>
					<p className="mt-2 text-2xl font-semibold text-gray-900">{total}</p>
				</div>
				<div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
					<p className="text-sm font-normal text-gray-500">완료</p>
					<p className="mt-2 text-2xl font-semibold text-emerald-700">{done}</p>
				</div>
				<div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
					<p className="text-sm font-normal text-gray-500">진행중</p>
					<p className="mt-2 text-2xl font-semibold text-amber-700">{doing}</p>
				</div>
			</div>
		</>
	)
}

export default StatisticsField
