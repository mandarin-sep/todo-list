import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteAxios, getAxios, patchAxios, postAxios } from '../../../shared/utils/http'
import type { TodoItem } from '../../../shared/types/todo'

export const useGetTodoList = () => {
	return useQuery<Array<TodoItem>, Error>({
		queryKey: ['todos'],
		queryFn: async () => {
			const res = await getAxios<{ data: Array<TodoItem> }>('/api/todos')
			return res.data
		},
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

			const optimisticKey = `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`
			const tmpTodoList: TodoItem = {
				key: optimisticKey,
				text: payload.text,
				status: 'doing',
				tags: payload.tags ?? []
			}

			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				return current ? [...current, tmpTodoList] : [tmpTodoList]
			})

			return { optimisticKey }
		},
		onError: (_error, _payload, context) => {
			window.alert('TodoList 추가에 실패했습니다.')
			if (!context?.optimisticKey) {
				return
			}
			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				if (!current) {
					return current
				}
				return current.filter((todo) => todo.key !== context.optimisticKey)
			})
		},
		onSuccess: (data, _payload, context) => {
			const created = data.data
			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				if (!current) {
					return [created]
				}
				const optimisticKey = context.optimisticKey
				if (optimisticKey && current.some((todo) => todo.key === optimisticKey)) {
					return current.map((todo) => (todo.key === optimisticKey ? created : todo))
				}
				if (current.some((todo) => todo.key === created.key)) {
					return current
				}
				return [...current, created]
			})
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
			const previousTodo = previous?.find((todo) => todo.key === payload.key)
			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				if (!current) {
					return current
				}
				return current.map((todo) => {
					if (todo.key !== payload.key) {
						return todo
					}
					return {
						key: todo.key,
						text: payload.text ?? todo.text,
						tags: payload.tags ?? todo.tags,
						status: payload.status ?? todo.status
					}
				})
			})

			return { previousTodo }
		},
		onError: (_error, payload, context) => {
			window.alert('TodoList 수정에 실패했습니다.')
			const previousTodo = context?.previousTodo
			if (!previousTodo) {
				return
			}
			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				if (!current) {
					return current
				}
				return current.map((todo) => (todo.key === payload.key ? previousTodo : todo))
			})
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
			const previousIndex = previous?.findIndex((todo) => todo.key === key) ?? -1
			const previousTodo = previousIndex >= 0 && previous ? previous[previousIndex] : undefined

			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				return current ? current.filter((todo) => todo.key !== key) : []
			})

			return { previousTodo, previousIndex }
		},
		onError: (_error, key, context) => {
			window.alert('TodoList 삭제에 실패했습니다.')
			if (!context?.previousTodo) {
				return
			}
			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				if (!current) {
					return current
				}
				if (current.some((todo) => todo.key === key)) {
					return current
				}
				const next = [...current]
				const insertAt =
					context.previousIndex >= 0 && context.previousIndex <= next.length
						? context.previousIndex
						: next.length
				next.splice(insertAt, 0, context.previousTodo!)
				return next
			})
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})
}
