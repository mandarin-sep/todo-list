import { useState } from 'react'

export const TodoInput = ({
	setShowTagInput,
	submitTodo,
	showTagInput
}: {
	setShowTagInput: (show: boolean) => void
	submitTodo: (todoText: string) => void
	showTagInput: boolean
}) => {
	const [todo, setTodo] = useState('')
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		submitTodo(todo)
		setTodo('')
	}
	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-2">
			<input
				className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
				type="text"
				placeholder="할 일을 입력하세요..."
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				type="button"
				onClick={() => setShowTagInput(!showTagInput)}
				className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			>
				태그 추가
			</button>
			<button type="submit" className="shrink-0 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black">
				추가
			</button>
		</form>
	)
}
