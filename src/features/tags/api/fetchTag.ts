import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAxios, patchAxios, postAxios } from '../../../shared/utils/http'

export const useGetTags = () => {
	return useQuery({
		queryKey: ['tags'],
		queryFn: async () => {
			const res = await getAxios<{ data: Array<string> }>('/api/tags')
			return res.data
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
			queryClient.setQueryData<Array<string>>(['tags'], () => {
				return tags
			})
			return { previous }
		},
		onError: (_error, _tag, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<string>>(['tags'], context.previous)
			}
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
			queryClient.setQueryData<Array<string>>(['tags'], (current) => {
				if (!current) {
					return [...tags]
				}
				return [...current, ...tags]
			})
			return { previous }
		},
		onError: (_error, _payload, context) => {
			if (context?.previous) {
				queryClient.setQueryData<Array<string>>(['tags'], context.previous)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['tags'] })
		}
	})
}
