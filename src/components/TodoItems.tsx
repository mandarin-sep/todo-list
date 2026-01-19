import { useDeleteTodo, usePatchTodo } from '../api/fetchList'
import Tag from './Tag'
import type { TodoItem } from '../types/todo'

const TodoItems = ({ todo }: { todo: TodoItem }) => {
	const { mutate: deleteTodo } = useDeleteTodo()
	const { mutate: patchTodo } = usePatchTodo()
	const handleToggleStatus = () => {
		patchTodo({
			key: todo.key,
			status: todo.status === 'doing' ? 'done' : 'doing'
		})
	}
	const handleDeleteTodo = () => {
		deleteTodo(todo.key)
	}
	const handleDeleteTag = (tag: string) => {
		patchTodo({
			key: todo.key,
			tags: todo.tags.filter((current) => current !== tag)
		})
	}
	return (
		<li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					checked={todo.status === 'done'}
					onChange={handleToggleStatus}
					className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20"
				/>
				<span className={`flex-1 text-sm ${todo.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{todo.text}</span>
				<button
					onClick={handleDeleteTodo}
					className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
				>
					삭제
				</button>
			</div>
			<div className="mt-3 flex flex-wrap gap-2">
				{todo.tags.map((tag: string) => (
					<Tag key={tag} deleteTag={() => handleDeleteTag(tag)}>
						{tag}
					</Tag>
				))}
			</div>
		</li>
	)
}

export default TodoItems
