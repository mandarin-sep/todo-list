import { useCallback } from 'react'
import { useDeleteTodo, usePatchTodo } from '../api/fetchList'
import type { TodoItem } from '../../../shared/types/todo'

export const useEditTodo = ({ todo }: { todo: TodoItem }) => {
    const { mutate: deleteTodo } = useDeleteTodo()
	const { mutate: patchTodo } = usePatchTodo()
	const handleToggleStatus = useCallback(() => {
		patchTodo({
			key: todo.key,
			status: todo.status === 'doing' ? 'done' : 'doing'
		})
	}, [todo.key, todo.status, patchTodo])
	const handleDeleteTodo = useCallback(() => {
		deleteTodo(todo.key)
	}, [todo.key, deleteTodo])
	const handleDeleteTag = useCallback((tag: string) => {
		patchTodo({
			key: todo.key,
			tags: todo.tags.filter((current) => current !== tag)
		})
	}, [todo.key, todo.tags, patchTodo])
    return {
        handleToggleStatus,
        handleDeleteTodo,
        handleDeleteTag,
    }
}