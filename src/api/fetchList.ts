import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteAxios, getAxios, patchAxios, postAxios } from '../utils/http'
import type { TodoItem } from '../types/todo'

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
	// 낙관적 업데이트/무효화를 위한 캐시 접근
	const queryClient = useQueryClient()

	return useMutation({
		// 서버 호출은 최소 형태로 타입까지 보장
		mutationFn: (payload: CreateTodoInput) =>
			postAxios<{ data: TodoItem }, CreateTodoInput>('/api/todos', payload),
		// 낙관적 업데이트: 빠른 UI 반응을 위한 임시 항목 추가
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

			// 실패 시 롤백할 수 있도록 이전 캐시를 반환
			return { previous }
		},
		// 실패 시 이전 캐시 스냅샷으로 롤백
		onError: (_error, _payload, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<TodoItem>>(['todos'], context.previous)
			}
		},
		// 서버 데이터와 일치시키기 위해 항상 재조회
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
	// 수정 액션도 동일하게 캐시 동기화 처리
	const queryClient = useQueryClient()

	return useMutation({
		// 키 기반 수정, mock 라우트와 동일한 형태
		mutationFn: (payload: UpdateTodoInput) =>
			patchAxios<{ data: TodoItem }, UpdateTodoInput>(`/api/todos/${payload.key}`, payload),
		// 낙관적 업데이트: 바로 화면에 반영
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

			// 실패 시 복구할 수 있도록 이전 캐시 저장
			return { previous }
		},
		// 실패 시 이전 상태로 롤백
		onError: (_error, _payload, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<TodoItem>>(['todos'], context.previous)
			}
		},
		// 최종적으로 서버 데이터와 동기화
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})
}

export const useDeleteTodo = () => {
	// 삭제 액션과 캐시를 동기화
	const queryClient = useQueryClient()

	return useMutation({
		// 키 기반 삭제, mock 라우트와 동일한 형태
		mutationFn: (key: string) => deleteAxios<{ data: { message: string } }>(`/api/todos/${key}`),
		// 낙관적 업데이트: 목록에서 즉시 제거
		onMutate: async (key) => {
			await queryClient.cancelQueries({ queryKey: ['todos'] })

			const previous = queryClient.getQueryData<Array<TodoItem>>(['todos'])

			queryClient.setQueryData<Array<TodoItem>>(['todos'], (current) => {
				return current ? current.filter((todo) => todo.key !== key) : []
			})

			return { previous }
		},
		// 실패 시 롤백
		onError: (_error, _key, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<TodoItem>>(['todos'], context.previous)
			}
		},
		// 캐시 일관성을 위해 재조회
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})
}