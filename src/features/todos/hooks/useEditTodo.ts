import { useDeleteTodo, usePatchTodo } from '../api/fetchList'
import type { TodoItem } from '../../../shared/types/todo'

export const useEditTodo = ({ todo }: { todo: TodoItem }) => {
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
    return {
        handleToggleStatus,
        handleDeleteTodo,
        handleDeleteTag,
    }
}