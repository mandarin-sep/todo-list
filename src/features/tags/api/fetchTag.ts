import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAxios, patchAxios, postAxios } from '../../../shared/utils/http'

const areArraysEqual = (tmpList: Array<string>, real: Array<string>) => {
	if (tmpList.length !== real.length) {
		return false
	}
	return tmpList.every((value, index) => value === real[index])
}

const mergeTags = (current: Array<string>, inputTags: Array<string>) => {
	const presentTags = [...current]
	const presentTagSet = new Set(current)
	for (const tag of inputTags) {
		if (!presentTagSet.has(tag)) {
			presentTagSet.add(tag)
			presentTags.push(tag)
		}
	}
	return presentTags
}

export const useGetTags = () => {
	return useQuery({
		queryKey: ['tags'],
		queryFn: async () => {
			const res = await getAxios<{ data: Array<string> }>('/api/tags')
			return res.data
		},
		onError: () => {	
			window.alert('태그 조회에 실패했습니다.')
		}
	})
}

export const usePostTags = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['tags', 'create'],
		mutationFn: async (tags: Array<string>) => {
			const res = await postAxios<{ data: Array<string> }, { tags: Array<string> }>(`/api/tags`, { tags })
			return res.data
		},
		onMutate: async (tags) => {
			await queryClient.cancelQueries({ queryKey: ['tags'] })
			const previous = queryClient.getQueryData<Array<string>>(['tags'])
			const localTags = [...tags]
			queryClient.setQueryData<Array<string>>(['tags'], localTags)
			return { previous, localTags }
		},
		onError: (_error, _tag, context) => {
			window.alert('태그 상태 변경에 실패했습니다.')
			if (!context?.localTags) {
				return
			}
			queryClient.setQueryData<Array<string> | undefined>(['tags'], (current) => {
				if (!current) {
					return current
				}
				if (!areArraysEqual(current, context.localTags)) {
					return current
				}
				return context.previous
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['tags'] })
		}
	})
}

export const useAddTag = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['tags', 'update'],
		mutationFn: async (tags: Array<string>) => {
			const res = await patchAxios<{ data: Array<string> }, { tags: Array<string> }>(`/api/tags`, { tags })
			return res.data
		},
		onMutate: async (tags) => {
			await queryClient.cancelQueries({ queryKey: ['tags'] })
			const previous = queryClient.getQueryData<Array<string>>(['tags'])
			const localTags = mergeTags(previous ?? [], tags)
			queryClient.setQueryData<Array<string>>(['tags'], localTags)
			return { previous, localTags }
		},
		onError: (_error, _payload, context) => {
			window.alert('태그 추가에 실패했습니다.')
			if (!context?.localTags) {
				return
			}
			queryClient.setQueryData<Array<string> | undefined>(['tags'], (current) => {
				if (!current) {
					return current
				}
				if (!areArraysEqual(current, context.localTags)) {
					return current
				}
				return context.previous
			})
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['tags'] })
		}
	})
}
