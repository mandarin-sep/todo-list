import { useState } from 'react'
import { useGetTodoList } from '../api/fetchList'
import { TODO_STATUS } from '../../../shared/constants/todoStatus'
import type { TodoStatus } from '../../../shared/constants/todoStatus'
import type { TodoItem } from '../../../shared/types/todo'

export const useTodoFilters = ({ selectedTag }: { selectedTag: string }) => {
    const { data: todos = []} = useGetTodoList()
    const [filter, setFilter] = useState<TodoStatus>(TODO_STATUS.ALL)
    
    const filteredByTag = todos.filter((todo: TodoItem) => {
		if (selectedTag === '') return true
		return todo.tags.some((tag: string) => tag === selectedTag)
	})
	const filteredByStatus = filteredByTag.filter((todo: TodoItem) => {
		if (filter === TODO_STATUS.DOING) return todo.status === TODO_STATUS.DOING
		if (filter === TODO_STATUS.DONE) return todo.status === TODO_STATUS.DONE
		return true
	})
	const handleFilter = (status: TodoStatus) => {
		setFilter(status)
	}
   
    return {
        filteredByStatus,
        handleFilter,
        filter
    }
}