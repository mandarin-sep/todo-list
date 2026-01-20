
import { useIsMutating } from '@tanstack/react-query'
import { CheckCircle } from 'lucide-react'
import { TodoList } from '../features/todos/components/TodoList'
import InputArea from '../features/todos/components/InputArea'
import StatisticsField from '../features/todos/components/UI/StatisticsField'
import EmptyField from '../features/todos/components/UI/EmptyField'
import { useGetTodoList } from '../features/todos/api/fetchList'

const LoadingOverlay = () => (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
        <div className="flex items-center gap-2 text-sm text-white">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/50 border-t-white" />
            <span>로딩 중...</span>
        </div>
    </div>
)

const TodoPage = () => {
    const { data: todos = [], isFetching } = useGetTodoList()
    const isTodosMutating = useIsMutating({ mutationKey: ['todos'] }) > 0
    const isTagsMutating = useIsMutating({ mutationKey: ['tags'] }) > 0
    const isMutating = isTodosMutating || isTagsMutating
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div>
                    <div className="flex items-center gap-2 text-gray-900">
                        <CheckCircle size={20} className="text-gray-900" />
                        <h2 className="text-xl font-semibold">할 일 목록</h2>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">오늘 해야 할 일들을 관리하세요.</p>
                </div>
                <StatisticsField todos={todos} />
                <div className="relative space-y-8">
                    <InputArea />
                    {todos.length > 0 ? <TodoList /> : <EmptyField />}
                    {isFetching || isMutating ? <LoadingOverlay /> : null}
                </div>
            </div>
        </div>
    )
}

export default TodoPage