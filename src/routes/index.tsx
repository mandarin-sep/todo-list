import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'
import { TodoList } from '../components/TodoList'
import InputArea from '../components/InputArea'
import StatisticsField from '../components/StatisticsField'
import EmptyField from '../components/EmptyField'
import { useGetTodoList } from '../api/fetchList'

export const Route = createFileRoute('/')({
	component: App
})

function App() {
	const { data: todos = [] } = useGetTodoList()
	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
				<div>
					<div className="flex items-center gap-2 text-gray-900">
						<CheckCircle size={20} className="text-gray-900" />
						<h2 className="text-xl font-semibold">할 일 목록</h2>
					</div>
					<p className="mt-1 text-sm text-gray-500">오늘 해야 할 일들을 관리하세요.</p>
				</div>
				<StatisticsField todos={todos} />
				<InputArea />
				{todos.length > 0 ? <TodoList todos={todos} /> : <EmptyField />}
			</div>
		</div>
	)
}
