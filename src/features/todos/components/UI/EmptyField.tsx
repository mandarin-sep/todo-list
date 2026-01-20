import { Check } from 'lucide-react'

const EmptyField = () => {
	return (
		<div className="mx-auto mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
			<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
				<span aria-hidden>
					<Check size={24} />
				</span>
			</div>
			<h3 className="text-lg font-semibold text-gray-900">할 일이 없습니다</h3>
			<p className="mt-1 text-sm text-gray-500">새로운 할 일을 추가해보세요</p>
		</div>
	)
}

export default EmptyField
