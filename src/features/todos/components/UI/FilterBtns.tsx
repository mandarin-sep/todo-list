import { TODO_STATUS_OPTIONS } from '../../../../shared/constants/todoStatus'
import type { TodoStatus } from '../../../../shared/constants/todoStatus'

const FilterBtns = ({ filter, handleFilter }: { filter: TodoStatus; handleFilter: (value: TodoStatus) => void }) => {
	return (
		<div className="mb-4 grid grid-cols-3 gap-2">
			{TODO_STATUS_OPTIONS.map(({ value, label }) => (
				<button
					key={value || 'all'}
					onClick={() => handleFilter(value)}
					className={`w-full rounded-lg px-4 py-3 text-base font-medium ${filter === value ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
						}`}
				>
					{label}
				</button>
			))}
		</div>
	)
}

export default FilterBtns
