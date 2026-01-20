import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteAxios, getAxios, patchAxios, postAxios } from '../../../shared/utils/http'
import type { TodoItem } from '../../../shared/types/todo'

export const useGetTodoList = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const res = await getAxios<{ data: Array<TodoItem> }>('/api/todos')
			return res.data
		}
	})
}

export type CreateTodoInput = {
	text: TodoItem['text']
	tags?: TodoItem['tags']
}

export const usePostTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['todos', 'create'],
		mutationFn: (payload: CreateTodoInput) =>
			postAxios<{ data: TodoItem }, CreateTodoInput>('/api/todos', payload),
		onMutate: async (payload) => {
			await queryClient.cancelQueries({ queryKey: ['todos'] })

			const previous = queryClient.getQueryData<Array<TodoItem>>(['todos'])
			const optimistic: TodoItem = {
				key: `temp-${Date.now()}`,
				text: payload.text,
				status: 'doing',
				tags: payload.tags ?? []
			}

			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				return current ? [...current, optimistic] : [optimistic]
			})

			return { previous }
		},
		onError: (_error, _payload, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<TodoItem>>(['todos'], context.previous)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})
}

export type UpdateTodoInput = {
	key: TodoItem['key']
	tags?: TodoItem['tags']
	text?: TodoItem['text']
	status?: TodoItem['status']
}

export const usePatchTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['todos', 'update'],
		mutationFn: (payload: UpdateTodoInput) =>
			patchAxios<{ data: TodoItem }, UpdateTodoInput>(`/api/todos/${payload.key}`, payload),
		onMutate: async (payload) => {
			await queryClient.cancelQueries({ queryKey: ['todos'] })

			const previous = queryClient.getQueryData<Array<TodoItem>>(['todos'])

			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				if (!current) {
					return current
				}
				return current.map((todo) => {
					if (todo.key !== payload.key) {
						return todo
					}
					return {
						...todo,
						text: payload.text ?? todo.text,
						tags: payload.tags ?? todo.tags,
						status: payload.status ?? todo.status
					}
				})
			})

			return { previous }
		},
		onError: (_error, _payload, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<TodoItem>>(['todos'], context.previous)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})
}

export const useDeleteTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['todos', 'delete'],
		mutationFn: (key: string) => deleteAxios<{ data: { message: string } }>(`/api/todos/${key}`),
		onMutate: async (key) => {
			await queryClient.cancelQueries({ queryKey: ['todos'] })

			const previous = queryClient.getQueryData<Array<TodoItem>>(['todos'])

			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				return current ? current.filter((todo) => todo.key !== key) : []
			})

			return { previous }
		},
		onError: (_error, _key, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<TodoItem>>(['todos'], context.previous)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})
}
