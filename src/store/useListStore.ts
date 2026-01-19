import { create } from 'zustand'
import type { TodoItem, TodoStore } from '../types/todo'

// -----------------------------------------------------------------------------
// Todo list store
// - 상태(state)와 액션(actions)을 분리해 읽기 쉽고 확장하기 쉽게 구성
// - 파생(derived) 값은 스토어 밖 selector로 관리해 재사용성과 테스트 용이성 확보
// -----------------------------------------------------------------------------

const initialState: Pick<TodoStore, 'list'> = {
	list: []
}

export const useListStore = create<TodoStore>((set) => ({
	...initialState,

	// 액션: 목록에 아이템 추가
	addTodo: (todo: TodoItem) => set((state) => ({ list: [...state.list, todo] })),

	// 액션: 목록에서 아이템 제거
	removeTodo: (todo: TodoItem) => set((state) => ({ list: state.list.filter((i) => i.key !== todo.key) })),

	// 액션: 상태 토글(doing <-> done)
	toggleStatus: (todo: TodoItem) =>
		set((state) => ({
			list: state.list.map((i) => (i.key === todo.key ? { ...i, status: i.status === 'doing' ? 'done' : 'doing' } : i))
		})),

	// 액션: 특정 태그를 해당 todo에서만 제거
	deleteTagFromTodo: (todo: TodoItem, tag: string) =>
		set((state) => ({
			list: state.list.map((i) => (i.key === todo.key ? { ...i, tags: i.tags.filter((t) => t !== tag) } : i))
		}))
}))

// -----------------------------------------------------------------------------
// Selectors
// - UI/다른 로직에서 필요한 값만 구독하도록 분리
// - 파생 state는 store 내부에 저장하지 말고 selector로 계산
// -----------------------------------------------------------------------------

export const listSelectors = {
	// 기본 데이터
	list: (state: TodoStore) => state.list,

	// 파생 데이터: 개수/상태별 통계
	totalCount: (state: TodoStore) => state.list.length,
	doneCount: (state: TodoStore) => state.list.filter((i) => i.status === 'done').length,
	doingCount: (state: TodoStore) => state.list.filter((i) => i.status === 'doing').length,

	// 파생 데이터: 유무 판단
	hasTodos: (state: TodoStore) => state.list.length > 0,

	// 파생 데이터: 특정 key로 아이템 찾기
	byKey: (key: string) => (state: TodoStore) => state.list.find((i) => i.key === key)
}
