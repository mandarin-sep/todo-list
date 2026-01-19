import { useState } from 'react'
import { useTagStore } from '../store/useTagStore'
import TodoItems from './TodoItems'
import FilterBtns from './FilterBtns'
import type { TodoItem } from '../types/todo'

export const TodoList = ({ todos = [] }: { todos?: Array<TodoItem> }) => {
	const { tags } = useTagStore()
	const [filter, setFilter] = useState<'' | 'doing' | 'done'>('')
	const [selectedTag, setSelectedTag] = useState<string>('')
	const filteredByTag = todos.filter((todo: TodoItem) => {
		if (selectedTag === '') return true
		return todo.tags.some((tag: string) => tag === selectedTag)
	})
	const filteredByStatus = filteredByTag.filter((todo: TodoItem) => {
		if (filter === 'doing') return todo.status === 'doing'
		if (filter === 'done') return todo.status === 'done'
		return true
	})

	const handleFilter = (status: '' | 'doing' | 'done') => {
		setFilter(status)
	}

	return (
		<>
			<div className="mt-8 mb-4 flex flex-wrap gap-2">
				<button
					onClick={() => setSelectedTag('')}
					className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
						selectedTag === '' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
					}`}
				>
					모든 태그
				</button>
				{tags.map((tag: string) => (
					<button
						key={tag}
						onClick={() => setSelectedTag(tag)}
						className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
							selectedTag === tag ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
						}`}
					>
						{tag}
					</button>
				))}
			</div>
			<FilterBtns filter={filter} handleFilter={handleFilter} />
			<ul className="space-y-3">
				{filteredByStatus.map((todo: TodoItem) => (
					<TodoItems key={todo.key} todo={todo} />
				))}
			</ul>
		</>
	)
}
