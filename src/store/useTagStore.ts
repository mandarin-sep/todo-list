import { create } from 'zustand'
import type { TagStore } from '../types/todo'

const initialState: Pick<TagStore, 'tags'> = {
	tags: []
}

export const useTagStore = create<TagStore>((set) => ({
	...initialState,

	addTag: (tag: string) => set((state) => ({ tags: [...state.tags, tag] })),
	removeTag: (tag: string) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) }))
}))
